export enum SidebarStates {
  VISIBLE = "visible",
  HIDDEN = "hidden",
}

export enum AppLanguages {
  UZ = "uz",
  RU = "ru",
}

export interface IUI {
  sidebarState: SidebarStates;
  lang: AppLanguages;
}
