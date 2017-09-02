// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  productUrl: 'http://localhost:5261/api/product',
  loginUrl: 'http://localhost:5261/token',
  profileUrl: 'http://localhost:5261/api/profile',
  recaptchaKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
};
