import {APPLICATION_STAGE_ENUM, APPLICATION_STAGE_STATUS_ENUM, APPLICATION_STATUS_ENUM} from "./Constants";

export const SET_APPLICATION_STATUS = (applicationStage, applicationStageStatus) => {

  let applicationStatus = APPLICATION_STATUS_ENUM.WISHLIST;

  switch (applicationStage) {
    case APPLICATION_STAGE_ENUM.APPLICATION_FORM_CV:
    case APPLICATION_STAGE_ENUM.TESTS_AND_ASSESSMENTS:
    case APPLICATION_STAGE_ENUM.INTERVIEW:
      switch (applicationStageStatus) {
        case APPLICATION_STAGE_STATUS_ENUM.IN_PROGRESS:
          applicationStatus = APPLICATION_STATUS_ENUM.IN_PROGRESS;
          break;
        case APPLICATION_STAGE_STATUS_ENUM.SUCCESSFUL:
          applicationStatus = APPLICATION_STATUS_ENUM.IN_PROGRESS;
          break;
        case APPLICATION_STAGE_STATUS_ENUM.UNSUCCESSFUL:
          applicationStatus = APPLICATION_STATUS_ENUM.UNSUCCESSFUL;
          break;
        case APPLICATION_STAGE_STATUS_ENUM.WITHDRAWN:
          applicationStatus = APPLICATION_STATUS_ENUM.WITHDRAWN;
          break;
        default:
          applicationStatus = APPLICATION_STATUS_ENUM.IN_PROGRESS;
      }
      break;
    case APPLICATION_STAGE_ENUM.COMPLETE:
      switch (applicationStageStatus) {
        case APPLICATION_STAGE_STATUS_ENUM.SUCCESSFUL:
          applicationStatus = APPLICATION_STATUS_ENUM.SUCCESSFUL;
          break;
        case APPLICATION_STAGE_STATUS_ENUM.UNSUCCESSFUL:
          applicationStatus = APPLICATION_STATUS_ENUM.UNSUCCESSFUL;
          break;
        case APPLICATION_STAGE_STATUS_ENUM.WITHDRAWN:
          applicationStatus = APPLICATION_STATUS_ENUM.WITHDRAWN;
          break;
        default:
          applicationStatus = APPLICATION_STATUS_ENUM.SUCCESSFUL;
      }
      break;
    default:
      applicationStatus = APPLICATION_STATUS_ENUM.IN_PROGRESS
  }
  console.log('applicationStatus', applicationStatus);
  return applicationStatus;
};