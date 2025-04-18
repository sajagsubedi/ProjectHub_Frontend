import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  REFETCH_ACCESS_TOKEN,
} from "./mutations/user.mutations";
import { CREATE_PROJECT, EDIT_PROJECT ,PIN_PROJECT,DELETE_PROJECT} from "./mutations/project.mutations";
import { GET_AUTHUSER } from "./queries/user.queries";
import {
  GETPINNEDPROJECTS,
  GETALLPROJECTS,
  GET_PROJECTBYID,
} from "./queries/project.queries";

export {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  REFETCH_ACCESS_TOKEN,
  GET_AUTHUSER,
  GETPINNEDPROJECTS,
  GETALLPROJECTS,
  GET_PROJECTBYID,
  CREATE_PROJECT,
  EDIT_PROJECT,
  PIN_PROJECT,
  DELETE_PROJECT
};
