import { Fragment } from "react";
import { List, Typography } from "@mui/material";
import NavItemLink from "../NavItemLink";
import NavCollapse from "../NavCollapse";

export default function NavGroup({ item, collapsed = false }) {
  const { title, caption, children = [] } = item;

  return (
    <Fragment>
      {!collapsed && title && (
        <Typography
          variant="caption"
          sx={{ px: 2, pt: 2, pb: 1, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.6 }}
        >
          {title}
          {caption ? ` — ${caption}` : ""}
        </Typography>
      )}
      <List sx={{ px: 1 }}>
        {children.map((menu) => {
          switch (menu.type) {
            case "item":
              return <NavItemLink key={menu.id} item={menu} collapsed={collapsed} />;
            case "collapse":
              return <NavCollapse key={menu.id} item={menu} collapsed={collapsed} />;
            default:
              return null;
          }
        })}
      </List>
    </Fragment>
  );
}
