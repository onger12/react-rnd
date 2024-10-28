import { useState } from "react";

import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

const questionsDummy = [
  {
    questionId : 1,
    questionTitle : 'Pregunta 1',
    questionDescription : 'Descripción pregunta 1',
    answerSelected : null,
    answers : [
      {
        answerId : 1,
        answerTitle : 'Respuesta #1',
        isCorrect : false,
      },
      {
        answerId : 2,
        answerTitle : 'Respuesta #2',
        isCorrect : false,
      },
      {
        answerId : 3,
        answerTitle : 'Respuesta #3',
        isCorrect : true,
      },
      {
        answerId : 4,
        answerTitle : 'Respuesta #4',
        isCorrect : false,
      },
    ],
  },
  {
    questionId : 2,
    questionTitle : 'Pregunta 2',
    questionDescription : 'Descripción pregunta 2',
    answerSelected : null,
    answers : [
      {
        answerId : 5,
        answerTitle : 'Respuesta #1',
        isCorrect : true,
      },
      {
        answerId : 6,
        answerTitle : 'Respuesta #2',
        isCorrect : false,
      },
      {
        answerId : 7,
        answerTitle : 'Respuesta #3',
        isCorrect : false,
      },
      {
        answerId : 8,
        answerTitle : 'Respuesta #4',
        isCorrect : false,
      },
    ],
  },
  {
    questionId : 3,
    questionTitle : 'Pregunta 3',
    questionDescription : 'Descripción pregunta 3',
    answerSelected : null,
    answers : [
      {
        answerId : 9,
        answerTitle : 'Respuesta #1',
        isCorrect : false,
      },
      {
        answerId : 10,
        answerTitle : 'Respuesta #2',
        isCorrect : false,
      },
      {
        answerId : 11,
        answerTitle : 'Respuesta #3',
        isCorrect : true,
      },
      {
        answerId : 12,
        answerTitle : 'Respuesta #4',
        isCorrect : false,
      },
    ],
  },
  {
    questionId : 4,
    questionTitle : 'Pregunta 4',
    questionDescription : 'Descripción pregunta 4',
    answerSelected : null,
    answers : [
      {
        answerId : 13,
        answerTitle : 'Respuesta #1',
        isCorrect : false,
      },
      {
        answerId : 14,
        answerTitle : 'Respuesta #2',
        isCorrect : false,
      },
      {
        answerId : 15,
        answerTitle : 'Respuesta #3',
        isCorrect : false,
      },
      {
        answerId : 16,
        answerTitle : 'Respuesta #4',
        isCorrect : true,
      },
    ],
  },
]

export const ResolveExam = ({ questions = questionsDummy, expandedView, formTitle = 'Titulo del cuestionario', handleDoneIntent }) => {

  const [completed, setCompleted] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // confirms
  const confirmDoneIntent = (event) => {
    confirmPopup({
        target: event.currentTarget,
        message: '¿Está seguro que desea terminar el intento?',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'reject',
        accept : handleDoneIntent,
        acceptLabel : 'Si',
      });
    };

  // handlers
  const handleNextTab = (e) => {
    if(currentTabIndex + 2 > questions?.length) {
      confirmDoneIntent(e);
      return;
    }

    setCurrentTabIndex(t => t + 1);
  }
  const handleSelectAnswer = ({ answerId }) => {
    const answerToAdd = { questionIndex : currentTabIndex, answerId };
    const aFound = completed?.find(t => t?.answerId == answerId);
    if(aFound) {
      setCompleted(t => t?.filter(t => t?.answerId != answerId));
      return;
    }
    
    const qFound = completed?.find(t => t?.questionIndex == currentTabIndex);
    if(qFound) {
      const c = [answerToAdd, ...completed?.filter(t => t?.questionIndex != currentTabIndex)];
      setCompleted(c);
      return;
    }

    setCompleted(t => ([...t, answerToAdd]));
  }

  return (
    <div className={`${!expandedView ? 'w-9' : 'w-full'} exam-resolve-height`}>
      <div className="w-full h-4rem px-3 flex align-items-center justify-content-between border-bottom-1 border-gray-200">
        <span className="block font-medium">{formTitle}</span>
        <span className="block font-medium">Intento 1 de 1</span>
        <div className="flex align-items-center gap-2">
          <span className="block font-medium">5:39 Mins Restantes</span>
          <i className="pi pi-clock" />
        </div>
      </div>
      <TabView 
        scrollable 
        activeIndex={currentTabIndex} 
        onTabChange={e => setCurrentTabIndex(e.index)} 
        pt={{ 
          panelContainer : { style : { padding : 0, margin : 0 } }
        }}
      >
        {
          questions?.map((t, i) => (
            <TabPanel key={t?.questionId} header={i + 1} pt={{ headerAction : { style : { borderBottom : i == currentTabIndex ? '2px solid #d3eac8' : completed?.find(t => t?.questionIndex == i) ? '3px solid #82bd69' : '' } } }}>
              <div className="w-full bg-gray-100 py-4">
                <div className="w-10 mx-auto">
                  <span className="block text-2xl font-medium text-gray-700">
                    {t?.questionDescription}
                  </span>
                  <div className="w-full mx-auto flex flex-column gap-2 mt-3">
                    {
                      t?.answers?.map((a, i) => (
                        <AnswerBody {...a} letter={'abcdefghijklmnopqrstuvwxyz'[i]} handleSelectAnswer={handleSelectAnswer} selected={completed?.map(t => t?.answerId)?.includes(a?.answerId)} />
                      ))
                    }
                  </div>
                </div>
                <div className="w-10 mx-auto flex align-items-center justify-content-center gap-2 mt-5">
                  <Button 
                    severity="secondary"
                    onClick={handleNextTab}
                    iconPos={currentTabIndex + 1 == questions?.length ? "left" : "right"}
                    icon={currentTabIndex + 1 == questions?.length ? 'pi pi-save' : 'pi pi-arrow-right'}
                    label={currentTabIndex + 1 == questions?.length ? "Terminar intento" : "Siguiente pregunta"}
                  />
                </div>
              </div>
            </TabPanel>
          ))
        }
      </TabView>
      <ConfirmPopup />
    </div>
  )
}

const AnswerBody = ({ answerId, answerTitle, isCorrect, letter, selected, handleSelectAnswer }) => (
  <div 
    onClick={() => handleSelectAnswer({ answerId })}
    className={`
      cursor-pointer 
      w-full 
      border-round-md 
      py-3 
      px-3 
      flex 
      align-items-center 
      gap-2 
      transition-all 
      transition-duration-300 
      transition-ease-out
      ${selected ? '' : 'hover:bg-green-100'}
    `}
    style={{ backgroundColor : selected ? '#82bd69' : 'white' }}
  >
    <div 
      className={`
        flex 
        align-items-center 
        justify-content-center 
        w-2rem 
        h-2rem 
        border-circle 
        border-gray-600 
        select-none
        text-gray-600
        transition-all 
        transition-ease-out
        transition-duration-200
      `}
      style={{ backgroundColor : selected ? '#d3eac8' : '' }}
    >
      {letter}
    </div>
    <span className="select-none w-full block text-gray-700">{answerTitle}</span>
  </div>
)