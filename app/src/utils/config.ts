const CONFIG = {
  REACT_APP_HOSTNAME: undefined,
  REACT_APP_SSO_URL: undefined,
};

export function getConfig() {
  if (CONFIG.REACT_APP_HOSTNAME && CONFIG.REACT_APP_SSO_URL) return CONFIG;

  const xobj: XMLHttpRequest = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', '../config.json', false);
  xobj.send(null);
  if (xobj.status === 200 || xobj.status === 0) {
    CONFIG.REACT_APP_HOSTNAME = JSON.parse(xobj.responseText).REACT_APP_HOSTNAME;
    CONFIG.REACT_APP_SSO_URL = JSON.parse(xobj.responseText).REACT_APP_SSO_URL;
  }
  return CONFIG;
}
