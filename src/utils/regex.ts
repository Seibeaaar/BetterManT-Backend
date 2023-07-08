export const nameRegex = /^[a-z ,.'-]+$/i;

export const buildRegex = (params: string[]) =>
  new RegExp(params.join("|"), "g");
