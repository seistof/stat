import {logger} from '@core/utils';

export async function navButtonsInit(m, h, l) {
  m.addListener(m.hierarchyButton, 'click', async () => {
    await h.hInit();
  });
  m.addListener(m.linkerButton, 'click', async () => {
    await l.lInit();
  });
  m.addListener(m.uploadButton, 'click', async () => {
    logger(`Upload Button`);
  });
  m.addListener(m.excelButton, 'click', async () => {
    logger(`Excel Button`);
  });
  m.addListener(m.exitButton, 'click', async () => {
    logger(`Exit Button`);
  });
  m.addListener(m.dMinistryButton, 'click', async () => {
    logger(`Dictionary: Ministry`);
  });
  m.addListener(m.dTerritoryButton, 'click', async () => {
    logger(`Dictionary: Territory`);
  });
  m.addListener(m.dProgramButton, 'click', async () => {
    logger(`Dictionary: Program`);
  });
}

export function removeErrorBox(element, box) {
  element.removeChild(box);
}
