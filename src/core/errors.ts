export class ClikAndMeowError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClikAndMeowError";
  }
}

export class AccountNotYetActivatedError extends ClikAndMeowError {
  constructor() {
    super("Couldn't login, your account is not activated yet, check your email");
    this.name = "AccountNotYetActivatedError";
  }
}

export class InvalidCredentialsError extends ClikAndMeowError {
  constructor() {
    super("Couldn't login, check your credentials");
    this.name = "InvalidCredentialsError";
  }
}

export class UnknownError extends ClikAndMeowError {
  constructor() {
    super("An unknown error occurred");
    this.name = "UnknownError";
  }
}

export class InvalidSessionError extends ClikAndMeowError {
  constructor() {
    super("Invalid session, you have to login");
    this.name = "InvalidSessionError";
  }
}
