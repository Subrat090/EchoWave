import { WebContainer } from '@webcontainer/api';

let webContainerInstance = null;

export const getWebContainer = async () => {
  if (webContainerInstance === null) {
    try {
      webContainerInstance = await WebContainer.boot();
      console.log("WebContainer booted:", webContainerInstance);
    } catch (error) {
      console.error("WebContainer boot error:", error);
    }
  }
  return webContainerInstance;
};
