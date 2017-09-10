// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  productUrl: '/api/product',
  orderUrl: '/api/order',
  userUrl: '/api/user',
  loginUrl: '/token',
  profileUrl: '/api/profile',
  recaptchaKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  paypalEnvironment: 'sandbox',
  paypalPaymentUrl: '/api/paypalpayment',
  paypalPaymentExecuteUrl: '/api/paypalpaymentexecute'
};
