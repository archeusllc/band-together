export interface SetSection {
  sectionId: string;
  setListId: string;
  name: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSetSectionInput {
  name: string;
  position: number;
}

export interface UpdateSetSectionInput {
  name?: string;
  position?: number;
}
