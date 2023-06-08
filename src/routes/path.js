// ----------------------------------------------------------------------

function paths(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/drapeaux_react";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: "/login",
  logout: "/logout",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
};
