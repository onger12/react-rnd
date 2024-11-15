import { useContext, useEffect, useState } from "react";

import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

import { useLearn } from "../../hooks";
import { RootContext } from "../../App";
import { ExpandView } from "../video-player";

export const ResolveExam = ({ 
  endOn, 
  examId, 
  startOn, 
  answers, 
  courseId, 
  document, 
  toastRef, 
  questions, 
  expandedView, 
  examDescription, 
  handleUpdateExam, 
  handleExpandedView, 
  examName = 'Titulo del cuestionario', 
}) => {

  const [completed, setCompleted] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // contexts
  const { handleLoaders, loaders } = useContext(RootContext);

  // hooks
  const { initExam, finishExam } = useLearn({ handleLoaders, toastRef });

  // confirms
  const confirmDoneIntent = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Está seguro que desea terminar el intento?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'reject',
      accept : () => finishExam({ body : completed?.map(t => ({ courseId, examId, document, questNum : questions[t?.questionIndex]?.questNum, answerNum : t?.answerNum })), headers : { document } }),
      acceptLabel : 'Si',
    });
  };

  // handlers
  const handleNextTab = async (e) => {
    if(currentTabIndex == questions?.length) {
      confirmDoneIntent(e);
      handleUpdateExam({ data : { endOn : new Date(), answers : completed?.map(t => ({ answerNum : t?.answerNum, correctAnswer : true, courseId, document, examId, questNum : questions[t?.questionIndex]?.questNum })) } });
      return;
    }

    if(currentTabIndex == 0 && !startOn) {
      await initExam({ body : { examId, courseId, document }, headers : { document } });
      handleUpdateExam({ data : { startOn : new Date() } });
      setCurrentTabIndex(1);
      return;
    }

    setCurrentTabIndex(t => t + 1);
  }
  const handleSelectAnswer = ({ answerNum }) => {
    const cti = currentTabIndex - 1;
    const answerToAdd = { questionIndex : cti, answerNum };
    const aFound = completed?.find(t => t?.answerNum == answerNum && t?.questionIndex == cti);
    if(aFound) {
      setCompleted(t => t?.filter(t => t?.questionIndex != cti));
      return;
    }
    
    const qFound = completed?.find(t => t?.questionIndex == cti);
    if(qFound) {
      console.log(completed?.filter(t => t?.questionIndex != cti))
      const c = [answerToAdd, ...completed?.filter(t => t?.questionIndex != cti)];
      setCompleted(c);
      return;
    }

    setCompleted(t => ([...t, answerToAdd]));
  }

  useEffect(() => {
    if(startOn && endOn) {
      setCurrentTabIndex(0);
    } else if(startOn) {
      setCurrentTabIndex(1);
    }
  }, [startOn]);

  useEffect(() => {
    if(answers?.length > 0) {
      setCompleted(answers?.map(t => ({ questionIndex : questions?.findIndex(q => q?.questNum == t?.questNum), answerNum : t?.answerNum })));
    }
  }, [answers]);

  return (
    <div className={`${!expandedView ? 'w-9' : 'w-full'} exam-resolve-height relative`}>
      <div className="w-full h-4rem px-3 flex align-items-center justify-content-between border-bottom-1 border-gray-200">
        <span className="block font-medium">{examName}</span>
        <span className="block font-medium">{!endOn && 'Tienes varios intentos'}</span>
        <div className="flex align-items-center gap-2">
          <span className="block font-medium">{endOn ? 'Terminamos! :)' : 'Tómate tu tiempo'}</span>
          {!endOn && <i className="pi pi-clock" />}
        </div>
      </div>
      <TabView 
        scrollable 
        activeIndex={currentTabIndex} 
        onTabChange={e => setCurrentTabIndex(e.index)} 
        pt={{ 
          panelContainer : { style : { padding : 0, margin : 0 } }
        }}
        className="relative"
      >
        <TabPanel 
          header="Inicio" 
          disabled={loaders?.finishExam} 
          pt={{ 
            headerAction : { 
              style : { 
                borderBottom : currentTabIndex == 0 ? '2px solid #d3eac8' : '',
                backgroundColor : currentTabIndex == 0 ? '#efefef' : '',
                borderTopLeftRadius : 0,
                borderTopRightRadius : 0,
                margin : '0px 1px',
              }
            } 
          }}
        >
          { expandedView && <ExpandView position={{ top : 60, right : 150 }} onClick={() => handleExpandedView(false)} /> }
          <div className="w-full py-2 px-4 bg-gray-100 py-4 flex flex-column justify-content-between" style={{ minHeight : '60vh' }}>
            <div className="w-full mx-auto">
              <h1 className="my-0 py-0">{examName}</h1>
              <span className="block w-full">{examDescription}</span>
            </div>
            <div className="w-full mx-auto flex align-items-center justify-content-center gap-2 mt-5">
              <Button 
                severity="secondary" 
                onClick={handleNextTab} 
                disabled={loaders?.initExam || endOn} 
                icon={!startOn && !endOn && loaders?.initExam ? 'pi pi-spin pi-spinner' : ''} 
                label={endOn ? 'Ya terminamos :)' : startOn ? "Continuar respondiendo" : "Iniciar cuestionario"} 
              />
            </div>
          </div>
        </TabPanel>
        {
          questions?.map((t, i) => (
            <TabPanel 
              header={i + 1} 
              key={t?.questNum} 
              disabled={!startOn || loaders?.finishExam}
              pt={{ 
                headerAction : { 
                  style : { 
                    borderBottom : completed?.find(t => t?.questionIndex == i) ? '3px solid #82bd69' : i == currentTabIndex - 1 ? '2px solid #d3eac8' : '', 
                    backgroundColor : currentTabIndex - 1 == i ? '#efefef' : '',
                    borderTopLeftRadius : 0,
                    borderTopRightRadius : 0,
                    margin : '0px 1px',
                  } 
                } 
              }} 
            >
              { expandedView && <ExpandView position={{ top : 60, right : 150 }} onClick={() => handleExpandedView(false)} /> }
              <div className="w-full bg-gray-100 py-4 flex flex-column justify-content-evenly" style={{ minHeight : '60vh' }}>
                <div className="w-10 mx-auto">
                  <span className="block text-2xl font-medium text-gray-700">
                    {t?.question}
                  </span>
                  <div className="w-full mx-auto flex flex-column gap-2 mt-3">
                    {
                      t?.answers?.map((a, i) => (
                        <AnswerBody 
                          {...a} 
                          disabled={!!endOn}
                          handleSelectAnswer={handleSelectAnswer} 
                          letter={'abcdefghijklmnopqrstuvwxyz'[i]} 
                          selected={completed?.find(t => t?.answerNum == a?.answerNum && t?.questionIndex == currentTabIndex - 1)} 
                        />
                      ))
                    }
                  </div>
                </div>
                <div className="w-10 mx-auto flex align-items-center justify-content-center gap-2 mt-5">
                  <Button 
                    severity="secondary" 
                    onClick={handleNextTab} 
                    iconPos={currentTabIndex == questions?.length ? "left" : "right"} 
                    tooltipOptions={{ showOnDisabled : true, showDelay : 500, position : 'bottom' }} 
                    label={currentTabIndex == questions?.length ? "Terminar intento" : "Siguiente pregunta"} 
                    disabled={currentTabIndex == questions?.length && completed?.length != questions?.length || loaders?.finishExam || !!endOn} 
                    tooltip={currentTabIndex == questions?.length && completed?.length != questions?.length ? "Tiene preguntas por responder" : ""} 
                    icon={loaders?.finishExam ? "pi pi-spin pi-spinner" : currentTabIndex == questions?.length ? 'pi pi-save' : 'pi pi-arrow-right'} 
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

const AnswerBody = ({ answerNum, answer, disabled, letter, selected, handleSelectAnswer }) => (
  <div 
    onClick={() => {
      if(disabled) return;

      handleSelectAnswer({ answerNum });
    }}
    className={`
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
      ${!disabled ? 'cursor-pointer' : ''} 
      ${selected || disabled ? '' : 'hover:bg-green-100'}
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
    <span className="select-none w-full block text-gray-700">{answer}</span>
  </div>
)