import React from "react";
import "./form-modal.css";
import { useLocation } from "react-router-dom";

const FormModal = ({
  title,
  modalToggleHandler,
  onSubmitHandler,
  textInputs,
  showOptions,
  showTextArea,
  showInputFile,
  btnSubmitTxt,
}) => {
  const route = useLocation().pathname;

  return (
    <>
      <form
        action=""
        className="form-modal-container"
        onSubmit={onSubmitHandler}
      >
        {route === "/login" || route === "/register" ? (
          <></>
        ) : (
          <>
            <p className="close-icon" onClick={modalToggleHandler}>
              X
            </p>
          </>
        )}
        <div className="form-modal-title">
          <h1>{title}</h1>
        </div>

        {textInputs.map((input, indx) => {
          return (
            <input
              type={input.type}
              placeholder={input.placeHolder}
              className="form-modal-inputs"
              value={input.value}
              onChange={input.onChangeHandler}
              key={indx}
            />
          );
        })}

        {showOptions && (
          <select
            className="form-modal-inputs"
            value={showOptions.optionValue}
            onChange={showOptions.onChangeOptions}
          >
            <option disabled value="">
              Select A Category
            </option>
            {showOptions.options.map((option) => {
              return (
                <option value={option.toLowerCase()} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        )}

        {showTextArea && (
          <textarea
            rows="5"
            className="form-modal-inputs"
            placeholder={showTextArea.textAreaPlaceHolder}
            value={showTextArea.textAreaValue}
            onChange={showTextArea.textAreaOnChange}
          ></textarea>
        )}

        {showInputFile && (
          <input
            type="file"
            className="form-modal-inputs"
            name="file"
            id="file"
            value={showInputFile.value}
            onChange={showInputFile.onChangeFile}
          />
        )}

        <button type="submit" className="form-modal-btn">
          {btnSubmitTxt}
        </button>
      </form>
    </>
  );
};

export default FormModal;
