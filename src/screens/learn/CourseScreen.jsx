import { useEffect, useRef, useState } from 'react';

import { OverlayPanel } from 'primereact/overlaypanel';
import { TabMenu } from 'primereact/tabmenu';

import { VideoPlayer } from '../../components';
import { ScrolledPanel } from '../../components/video-player/scrolled-panel';
import { LearnWrapper } from '../../wrappers';
import { useLocation, useParams } from 'wouter';
import { courses, schools } from '../../data';

const tabItems = [
  { label: '', icon: 'pi pi-search' },
  { label: 'Descripción general', icon: '' },
  { label: 'Preguntas', icon: '' },
];

const seccionList = [
  {
    name : 'Sección 1',
    videos : [
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+1',
        duration : 5,
        title : 'Video de prueba #1',
        description : 'Este es el video de prueba #1',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+2',
        duration : 7,
        title : 'Video de prueba #2',
        description : 'Este es el video de prueba #2',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+3',
        duration : 15,
        title : 'Video de prueba #3',
        description : 'Este es el video de prueba #3',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+4',
        duration : 12,
        title : 'Video de prueba #4',
        description : 'Este es el video de prueba #4',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+5',
        duration : 3,
        title : 'Video de prueba #5',
        description : 'Este es el video de prueba #5',
      },
    ],
  },
  {
    name : 'Sección 2',
    videos : [
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+6',
        duration : 5,
        title : 'Video de prueba #6',
        description : 'Este es el video de prueba #6',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+7',
        duration : 7,
        title : 'Video de prueba #7',
        description : 'Este es el video de prueba #7',
      },
    ],
  },
  {
    name : 'Sección 3',
    videos : [
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+11',
        duration : 5,
        title : 'Video de prueba #11',
        description : 'Este es el video de prueba #11',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+12',
        duration : 7,
        title : 'Video de prueba #12',
        description : 'Este es el video de prueba #12',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+13',
        duration : 15,
        title : 'Video de prueba #13',
        description : 'Este es el video de prueba #13',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+11',
        duration : 5,
        title : 'Video de prueba #11',
        description : 'Este es el video de prueba #11',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+12',
        duration : 7,
        title : 'Video de prueba #12',
        description : 'Este es el video de prueba #12',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+13',
        duration : 15,
        title : 'Video de prueba #13',
        description : 'Este es el video de prueba #13',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+11',
        duration : 5,
        title : 'Video de prueba #11',
        description : 'Este es el video de prueba #11',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+12',
        duration : 7,
        title : 'Video de prueba #12',
        description : 'Este es el video de prueba #12',
      },
      {
        url : 'https://grupoaldor-my.sharepoint.com/:v:/g/personal/juan_martinez_aldoronline_com/EdRP0GshiS9NqRcRUepcKfwBjp8uBUfy4K3evTtufg-xHQ?e=1eEMdj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&download=1',
        poster : 'https://placehold.co/600x300?text=Video+13',
        duration : 15,
        title : 'Video de prueba #13',
        description : 'Este es el video de prueba #13',
      },
    ],
  },
];

const logo = '/logo_white.svg';

export const CourseScreen = () => {

  // states
  const [expandedView, setExpandedView] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  const [location, setLocation] = useLocation();
  const { schoolId, dni, courseId } = useParams();

  // refs
  const op = useRef(null);

  // handlers
  const handleExpandedView = () => setExpandedView(t => !t);
  const handleCurrentVideoIndex = (i) => setCurrentVideoIndex(i);
  const handleCurrentSectionIndex = (i) => setCurrentSectionIndex(i);

  useEffect(() => {
    if(currentSectionIndex != null && currentVideoIndex != null) {
      setCurrentVideo(seccionList[currentSectionIndex]?.videos[currentVideoIndex]);
    }
  }, [currentSectionIndex, currentVideoIndex]);

  useEffect(() => {
    console.log('first')
  }, [dni]);
  

  return (
    <LearnWrapper>
      <div className="min-h-screen">
        <div className='py-2'>
          <h1 className='my-0'>{courses?.find(t => t.id == courseId)?.name}</h1>
          <span className='font-italic'>{schools?.find(t => t.id == schoolId)?.name}</span>
        </div>
        <div className='flex'>
          <div className={`${expandedView ? 'w-full' : 'w-9'}`}>
            <VideoPlayer 
              expandedView={expandedView}
              handleExpandedView={handleExpandedView}
              video={currentVideo?.url}
              poster={currentVideo?.poster}
            />
            <TabMenu model={tabItems} className='mx-3' activeIndex={1} />
            <div className='py-3 px-5'>
              <span className='block text-2xl pb-3'>{currentVideo?.title}</span>
              <div className='flex gap-5 align-items-center'>
                <div className=''>
                  <span className='font-bold text-sm block'>4.5 <i className='pi pi-star text-yellow-400' /></span>
                  <span className='text-xs block'>50 calificaciones</span>
                </div>
                <div className=''>
                  <span className='font-bold text-sm block'>820</span>
                  <span className='text-xs block'>Personas capacitadas</span>
                </div>
                <div className=''>
                  <span className='font-bold text-sm block'>23,4 horas</span>
                  <span className='text-xs block'>Total</span>
                </div>

              </div>
            </div>
            <div style={{ height : 500, width : '100%' }} />
          </div>  
          <ScrolledPanel 
            seccionList={seccionList}
            expandedView={expandedView} 
            currentVideo={currentVideo}
            handleExpandedView={handleExpandedView} 
            handleCurrentVideoIndex={handleCurrentVideoIndex}
            handleCurrentSectionIndex={handleCurrentSectionIndex}
          />
        </div>

        <OverlayPanel ref={op} className='border-noround border-1 border-gray-300'>
          <div className='w-15rem'>
            <span className='block text-sm font-bold'>8 de 22 completados.</span>
            <span className='block mt-2 text-sm'>Acaba el curso para obtener tu certificado.</span>
          </div>
        </OverlayPanel>
      </div>
    </LearnWrapper>
  )
}
