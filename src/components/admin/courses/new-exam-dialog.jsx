import { useEffect, useRef, useState } from "react";

import uuid from "react-uuid";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { TabPanel, TabView } from "primereact/tabview";
import { ToggleButton } from "primereact/togglebutton";
import { InputTextarea } from "primereact/inputtextarea";

import { useForm } from "../../../hooks";
import { handleToastDone } from "../../../helpers";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

const ca = { toAddNews : true, id : 0, isCorrect : false, answerTitle : '' };
const initialAddQuestion = {
  id : 0,
  adding : true,
  questionTitle : '',
  answers : [{...ca}],
};

export const NewExamDialog = ({ visible, onHide }) => {
  
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isEditingAnswerTitle, setIsEditingAnswerTitle] = useState(null);
  const [disableButonSaveExam, setDisableButonSaveExam] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([{...initialAddQuestion}]);

  // hooks
  const { formState, onChange, onChangeManual } = useForm({
    title : '',
    description : '',
  });

  // refs
  const toastRef = useRef(null);

  // confirms
  const confirmRemoveQuestion = ({ event, question }) => {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Está segura que desea eliminar la pregunta?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'reject',
      accept : () => handleRemoveQuestion({ question }),
      acceptLabel : 'Si',
    });
  };

  // handlers
  const handleHide = () => {
    onHide && onHide();
  }
  const handleValidateButtonSaveExamDisable = () => {
    let flag = false;
    if(currentQuestions?.length == 0 || !currentQuestions) return true;
    if(!formState?.title || !formState?.description) return true;

    return flag;
  }
  const handleResetAddQuestion = ({ newQuestion }) => {
    const cq = [...currentQuestions];
    const qIndex = cq?.findIndex(t => t?.id == initialAddQuestion?.id);
    if(qIndex >= 0) {
      const l = cq.slice(0, qIndex);
      const r = cq.slice(qIndex + 1);
      handleQuestions([...l, {...initialAddQuestion, answers : initialAddQuestion?.answers?.map(t => ({...t, answerTitle : ''})) }, {...(newQuestion ?? {})}, ...r]);
      handleToastDone({ detail : 'Pregunta agregada correctamente.', ref : toastRef });
    }
  }
  const handleAddNewAnswerInStage = () => {
    const qs = [...currentQuestions];
    const qIndex = qs?.findIndex(t => t?.id == currentQuestions[currentTabIndex]?.id);
    if(qIndex >= 0) {
      const ca_ = qs[qIndex]?.answers?.find(t => t?.id == 0);
      qs[qIndex].answers = [{...ca}, ({ answerTitle : ca_?.answerTitle, isCorrect : ca_?.isCorrect, id : uuid(), questionId : 0 }), ...qs[qIndex]?.answers?.filter(t => t?.id != 0)];
      handleQuestions(qs);
    }
    setIsEditingAnswerTitle(null);
  }
  const gcq = () => currentQuestions?.find(t => t?.adding);
  const handleChangeQuestionTitle = ({ event, question }) => {
    const { value } = event?.target ?? {};
    const qs = [...currentQuestions];
    const qIndex = qs.findIndex(t => t?.id == question?.id);
    if(qIndex >= 0) {
      qs[qIndex].questionTitle = value;
      handleQuestions(qs);
    }
  }
  const handleChangeAnswerTitle = ({ event, answer }) => {
    const { value } = event?.target ?? {};
    const qs = [...currentQuestions];
    const qIndex = qs.findIndex(t => t?.id == currentQuestions[currentTabIndex]?.id);
    if(qIndex >= 0) {
      const aIndex = qs[qIndex]?.answers?.findIndex(t => t?.id == answer?.id);
      if(aIndex >= 0) {
        qs[qIndex].answers[aIndex].answerTitle = value;
        handleQuestions(qs);
      }
    }
  }
  const handleChangeIsCorrectAnswer = ({ isCorrect, answer }) => {
    const qs = [...currentQuestions];
    const qIndex = qs.findIndex(t => t?.id == currentQuestions[currentTabIndex]?.id);
    if(qIndex >= 0) {
      const aIndex = qs[qIndex]?.answers?.findIndex(t => t?.id == answer?.id);
      if(aIndex >= 0) {
        qs[qIndex].answers = qs[qIndex].answers?.map((t,i) => ({...t, isCorrect : isCorrect ? aIndex == i : false }));
        handleQuestions(qs);
      }
    }
  }
  const handleQuestions = (qs) => setCurrentQuestions(qs);
  const handleAddNewQuestion = () => {
    onChangeManual({ questionTitle : '' });
    const cq = currentQuestions?.find(t => t?.id == initialAddQuestion?.id);
    const newQuestion = {
      questionTitle : formState?.questionTitle,
      answers : cq.answers,
    }
    handleResetAddQuestion({ newQuestion });
  }
  const handleAddNewAnswerToQuestion = ({ answer, question }) => {
    if(!answer || !question?.id) return;
    const qs = [...currentQuestions];
    const qIndex = qs.findIndex(t => t?.id == question?.id);
    if(qIndex >= 0) {
      qs[qIndex].answers = [answer, ...(qs[qIndex]?.answers ?? [])];
      handleQuestions(qs);
    }
  }
  const handleEditAnswerInQuestion = ({ answer, question }) => {
    if(!answer?.id || !question?.id) return;
    const qs = [...currentQuestions];
    const qIndex = qs.findIndex(t => t?.id == question?.id);
    if(qIndex >= 0) {
      const as = [...qs[qIndex]?.answers];
      const aIndex = as.findIndex(t => t?.id == answer?.id);
      if(aIndex >= 0) {
        as[aIndex] = {...answer};
        qs[qIndex].answers = as;
        handleQuestions(qs);
      }
    }
  }
  const handleRemoveAnswerFromQuestion = ({ answer }) => {
    if(!answer?.id) return;
    const qs = [...currentQuestions];
    const qIndex = qs.findIndex(t => t?.id == (answer?.questionId ?? 0));
    if(qIndex >= 0) {
      qs[qIndex].answers = qs[qIndex]?.answers?.filter(t => t?.id != answer?.id);
      handleQuestions(qs);
    }
  }
  const handleRemoveQuestion = ({ question }) => {
    if(!question?.id && currentTabIndex == null) return;

    if(question?.id) {
      const qs = currentQuestions?.filter(t => t?.id != (question?.id || currentQuestions[currentTabIndex]?.id));
      handleQuestions(qs);
      return;
    }
    console.log(currentTabIndex)

    const l = currentQuestions.slice(0, currentTabIndex);
    const r = currentQuestions.slice(currentTabIndex + 1);
    handleQuestions([...l, ...r]);
    setCurrentTabIndex(currentTabIndex - 1);
  }

  // bodys
  const BodyAnswerTitle = ({ answer, autoFocus }) => {
    if(isEditingAnswerTitle?.id == answer?.id || answer?.toAddNews) {
      return (
        <form className="flex align-items-center gap-2" onSubmit={(e) => { e.preventDefault(); () => handleAddNewAnswerInStage(); }}>
          <InputText 
            rows={1} 
            className="w-full" 
            autoFocus={autoFocus} 
            value={answer?.answerTitle} 
            disabled={answer?.toAddNews && !!isEditingAnswerTitle} 
            onChange={(event) => handleChangeAnswerTitle({ event, answer })} 
            placeholder={answer?.toAddNews ? "Agrega una nueva opción aquí..." : "No puedes dejar este campo vacío!"} 
          />
          {
            (isEditingAnswerTitle?.id == answer?.id) 
              ? (
                <Button 
                  rounded 
                  icon="pi pi-check" 
                  severity="secondary" 
                  className="w-2rem h-2rem" 
                  onClick={() => setIsEditingAnswerTitle(false)} 
                  disabled={answer?.answerTitle == null || answer?.answerTitle?.length == 0 || (answer?.toAddNews && !!isEditingAnswerTitle)} 
                />
              )
              : (
                <Button
                  rounded
                  icon="pi pi-save"
                  severity="secondary"
                  className="w-2rem h-2rem"
                  onClick={handleAddNewAnswerInStage}
                  disabled={answer?.answerTitle == null || answer?.answerTitle?.length == 0 || (answer?.toAddNews && !!isEditingAnswerTitle)}
                />
              )
          }
        </form>
      )
    }

    return (
      <div className="flex align-items-center hover-cursor-text gap-2">
        <div 
          onClick={() => setIsEditingAnswerTitle(answer)}
          className="border-round-sm border-1 border-transparent p-2 w-full div-input-child transition-all transition-ease-out transition-duration-200"
        >
          {answer?.answerTitle}
        </div>
        <Button 
          rounded
          outlined
          icon="pi pi-trash"
          severity="danger"
          tooltip="Eliminar opción"
          tooltipOptions={{ position : 'top', showDelay : 500 }}
          className="w-2rem h-2rem transition-all transition-ease-out transition-duration-200 button-hidden-child opacity-0"
          onClick={() => handleRemoveAnswerFromQuestion({ answer })}
        />
      </div>
    )
  }
  const BodyIsCorrect = ({ answer }) => (
    <ToggleButton 
      onLabel="Si" 
      className="w-full" 
      checked={answer?.isCorrect} 
      disabled={answer?.toAddNews} 
      onChange={(e) => handleChangeIsCorrectAnswer({ isCorrect : e.value, answer })} 
    />
  )
  const BodyFooter = () => {
    return (
      <div className="flex align-items-center gap-2 pt-4">
        <Button 
          outlined
          label="Cancelar"
          icon="pi pi-times"
          className="w-full"
          severity="secondary"
          onClick={handleHide}
        />
        <Button 
          icon="pi pi-save"
          className="w-full"
          severity="secondary"
          form="exam-create-form"
          label="Guardar cuestionario"
          disabled={disableButonSaveExam}
        />
      </div>
    )
  }

  useEffect(() => {
    setDisableButonSaveExam(handleValidateButtonSaveExamDisable());
  }, [currentQuestions, formState?.title, formState?.description]);

  return (
    <Dialog 
      visible={visible} 
      footer={BodyFooter} 
      onHide={handleHide} 
      className="w-10 xl:w-8" 
      style={{ height : '95vh' }} 
      contentClassName="pt-3 pb-0" 
      headerClassName="py-2 px-4 border-bottom-1 border-gray-100" 
      header={formState?.title ? formState?.title : "Cuestionario nuevo"} 
    >
      <form id="exam-create-form" className="w-full flex flex-column" onSubmit={e => e?.preventDefault()}>
        <label className="w-full">
          <span className="block">Título del cuestionario<span className="text-red-400 font-bold">*</span></span>
          <InputText 
            autoFocus
            name="title"
            className="w-full"
            onChange={onChange}
            value={formState?.title}
            placeholder="Ponle un título..."
          />
        </label>
        <label className="w-full">
          <span className="block">Descripción del cuestionario<span className="text-red-400 font-bold">*</span></span>
          <InputTextarea 
            rows={3}
            name="description"
            className="w-full"
            onChange={onChange}
            value={formState?.description}
            placeholder="Escribe algo aquí..."
          />
        </label>
      </form>
      <TabView 
        scrollable 
        activeIndex={currentTabIndex} 
        pt={{ panelContainer : { style : { padding : '8px 4px 0px 4px' }}}} 
        onTabChange={e => {setCurrentTabIndex(e.index); setIsEditingAnswerTitle(null)}} 
      >
        <TabPanel header="Nueva pregunta" headerClassName="flex align-items-baseline" leftIcon="pi pi-plus-circle mr-2 text-xs font-bold">
          <QuestionForm 
            isNewQuestion 
            onChange={onChange} 
            answers={gcq()?.answers} 
            BodyIsCorrect={BodyIsCorrect} 
            BodyAnswerTitle={BodyAnswerTitle}
            currentQuestions={currentQuestions} 
            questionTitle={formState?.questionTitle} 
            handleAddNewQuestion={handleAddNewQuestion} 
          />
        </TabPanel>
        {
          currentQuestions?.filter(t => !t?.adding)?.map((t, i) => (
            <TabPanel header={`Pregunta #${currentQuestions?.filter(t => !t?.adding)?.length - i}`} key={uuid()}>
              <QuestionForm 
                question={t}
                answers={t?.answers} 
                formState={formState} 
                BodyIsCorrect={BodyIsCorrect} 
                questionTitle={t?.questionTitle} 
                BodyAnswerTitle={BodyAnswerTitle} 
                currentQuestions={currentQuestions} 
                onChange={handleChangeQuestionTitle} 
                handleAddNewQuestion={handleAddNewQuestion} 
                handleRemoveQuestion={confirmRemoveQuestion}
              />
            </TabPanel>
          ))
        }
      </TabView>

      <Toast ref={toastRef} />
      <ConfirmPopup />
    </Dialog>
  )
}

const QuestionForm = ({ onChange, questionTitle, handleAddNewQuestion, currentQuestions, BodyAnswerTitle, BodyIsCorrect, answers, isNewQuestion, question, handleRemoveQuestion }) => (
  <div className="w-full" style={{ height : '45vh' }}>
    <label className="w-full">
      <span>Encabezado de la pregunta<span className="text-red-400 font-bold">*</span></span>
    </label>
    <div className="flex w-full gap-2">
      <InputTextarea 
        rows={1} 
        className="w-full" 
        onChange={(event) => {
          if(isNewQuestion) {
            onChange && onChange(event);
            return;
          }
          onChange && onChange({event, question })
        }} 
        name="questionTitle" 
        value={questionTitle} 
        autoFocus={!isNewQuestion} 
        placeholder="Describe la pregunta..." 
      />
      {
        isNewQuestion 
          ? (
            <Button 
              outlined 
              icon="pi pi-save" 
              severity="secondary" 
              className="w-4 h-3rem" 
              label="Agregar pregunta"
              // tooltip={
              //   currentQuestions?.find(t => t?.id == 0)?.answers?.every(t => !t?.isCorrect)
              //     ? 'Al menos una opción de respuesta debe estar marcada como \'Es correcta\''
              //     : (currentQuestions?.find(t => t?.id == 0)?.answers || currentQuestions?.find(t => t?.id == 0)?.answers?.length == 0)
              //       ? 'Debe agregar al menos una respuesta' 
              //       : ''
              // }
              onClick={handleAddNewQuestion}
              tooltipOptions={{ position : 'top', showDelay : 250 }} 
              disabled={!questionTitle || !currentQuestions?.find(t => t?.id == 0)?.answers || currentQuestions?.find(t => t?.id == 0)?.answers?.length == 0 || currentQuestions?.find(t => t?.id == 0)?.answers?.every(t => !t?.isCorrect)} 
            />
          )
          : (
            <Button 
              outlined 
              icon="pi pi-save" 
              severity="danger" 
              className="w-4 h-3rem" 
              label="Eliminar pregunta"
              // tooltip={
              //   currentQuestions?.find(t => t?.id == 0)?.answers?.every(t => !t?.isCorrect)
              //     ? 'Al menos una opción de respuesta debe estar marcada como \'Es correcta\''
              //     : (currentQuestions?.find(t => t?.id == 0)?.answers || currentQuestions?.find(t => t?.id == 0)?.answers?.length == 0)
              //       ? 'Debe agregar al menos una respuesta' 
              //       : ''
              // }
              onClick={(event) => handleRemoveQuestion({ event, question })}
              tooltipOptions={{ position : 'top', showDelay : 250 }} 
            />
          )
      }
    </div>
    <h3 className="mt-3 mb-2">Opciones de respuestas</h3>
    <DataTable
      scrollable
      size="small"
      showGridlines
      value={answers ?? []}
      scrollHeight="35vh"
    >
      <Column
        field="answerTitle"
        header="Opción"
        body={(answer) => BodyAnswerTitle({ answer, autoFocus : isNewQuestion })}
      />
      <Column
        field="isCorrect"
        header="Es correcta"
        body={(answer) => BodyIsCorrect({ answer })}
        bodyClassName="w-8rem"
      />
    </DataTable>
  </div>
)