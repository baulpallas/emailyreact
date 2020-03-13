import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formfields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions/index";

const SurveyReview = ({ onCancel, formValues, SubmitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>

        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please Confirm your entries</h5>
      {reviewFields}

      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => SubmitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        <i className="material-icons right">email</i>
        Send Survey
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  //will end up as props on component
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
