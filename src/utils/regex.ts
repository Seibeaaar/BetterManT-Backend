export const NAME_REGEX =
	/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;

export const buildRegex = (params: string[]) =>
  new RegExp(params.join("|"), "g");
