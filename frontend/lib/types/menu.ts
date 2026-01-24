export interface MenuItem {
  id: string;
  label: string;
  path: string;
  url?: string;
  target?: string;
  description?: string;
  parentId?: string | null;
  order?: number;
  children?: MenuItem[];
  icon?: React.ReactNode;
}

export interface MenuResponse {
  menu: {
    nodes: MenuItem[];
  };
}
