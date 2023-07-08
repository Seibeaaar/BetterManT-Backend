export const NAME_REGEX = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

export const buildRegex = (params: string[]) =>
  new RegExp(params.join("|"), "g");
