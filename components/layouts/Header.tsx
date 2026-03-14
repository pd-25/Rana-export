"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@/components/ui/icon/Icon";
import Image from "next/image";
import logo from "@/public/rana-export-logo.svg";
import { navLinks, type NavLink } from "@/lib/constants";
import Typography from "@mui/material/Typography";
import flagUs from "@/public/flags/flag-us.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useCartWishlist } from "@/context/CartWishlistContext";

// Animated badge styles matching the provided image
const wishlistBadgeSx = {
  "& .MuiBadge-badge": {
    backgroundColor: "#C0717A", // pinkish-rose (matches logo colors)
    color: "#fff",
    fontWeight: 700,
    fontSize: "11px",
    minWidth: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #fff",
    animation: "badgePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
    "@keyframes badgePop": {
      "0%": { transform: "scale(0)" },
      "100%": { transform: "scale(1)" },
    },
  },
};

const cartBadgeSx = {
  "& .MuiBadge-badge": {
    backgroundColor: "#3DC6B4", // teal/mint (matches image)
    color: "#fff",
    fontWeight: 700,
    fontSize: "11px",
    minWidth: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #fff",
    animation: "badgePop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
    "@keyframes badgePop": {
      "0%": { transform: "scale(0)" },
      "100%": { transform: "scale(1)" },
    },
  },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null,
  );
  const { cartCount, wishlistCount, isLoggedIn, openAuthModal } =
    useCartWishlist();

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setScrollDirection(null);
      } else if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerOuterClass = [
    "headerOuter",
    scrollDirection === "down" ? "scrollDown" : "",
    scrollDirection === "up" ? "scrollUp" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ p: 3, backgroundColor: "#ffffff", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box className="logoContainer">
          <Image
            src={logo}
            alt="logo"
            width={210}
            height={80}
            className="logoImage"
          />
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: "#000000" }}
          aria-label="close menu"
        >
          <Icon name="close" width={24} height={24} />
        </IconButton>
      </Box>
      <Stack direction="column" spacing={2}>
        {navLinks.map((link: NavLink) => (
          <Link
            key={link.name}
            href={link.href}
            className="mobileNavLink"
            onClick={handleDrawerToggle}
          >
            {link.name}
          </Link>
        ))}
        <Box
          component={isLoggedIn ? Link : "div"}
          href={isLoggedIn ? "/profile" : undefined}
          className="mobileNavLink"
          onClick={() => {
            if (!isLoggedIn) {
              openAuthModal("login");
              handleDrawerToggle();
            } else {
              handleDrawerToggle();
            }
          }}
          sx={{ cursor: "pointer" }}
        >
          {isLoggedIn ? "My Profile" : "Login / Register"}
        </Box>
        <Link
          href="/wishlist"
          className="mobileNavLink"
          onClick={handleDrawerToggle}
        >
          Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
        </Link>
        <Link
          href="/cart"
          className="mobileNavLink"
          onClick={handleDrawerToggle}
        >
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </Stack>
    </Box>
  );

  return (
    <Box component="header" className="header">
      <Box
        className="headerTopBar"
        sx={{
          backgroundColor: "#FFE5DB",
          padding: "15px 20px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#606060",
            fontWeight: 300,
            fontSize: "18px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Quick dispatch across all purchases
        </Typography>
      </Box>

      <Box
        className={headerOuterClass}
        sx={{ backgroundColor: "#ffffff", padding: "15px 0" }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box className="logoContainer">
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Image
                  src={logo}
                  alt="logo"
                  width={210}
                  height={80}
                  className="logoImage"
                />
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box
              className="navLinksOuter"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4,
              }}
            >
              {navLinks.map((link: NavLink) => (
                <Link key={link.name} href={link.href} className="navLink">
                  {link.name}
                </Link>
              ))}
            </Box>

            {/* Desktop Utility Icons */}
            <Box
              className="utilityIconsOuter"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* Language */}
              <IconButton
                className="iconButton"
                aria-label="language selector"
                color="primary"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <Image src={flagUs} alt="flag" width={24} height={24} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <Image
                    src={flagUs}
                    alt="English"
                    width={24}
                    height={24}
                    style={{ marginRight: 8 }}
                  />
                  EN
                </MenuItem>
              </Menu>

              {/* Wishlist with animated badge */}
              <Tooltip title="My Wishlist" arrow>
                <IconButton
                  className="iconButton"
                  aria-label="wishlist"
                  color="primary"
                  component={Link}
                  href="/wishlist"
                >
                  <Badge
                    badgeContent={wishlistCount}
                    invisible={wishlistCount === 0}
                    sx={wishlistBadgeSx}
                  >
                    <Icon name="headerWishlist" width={24} height={24} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* User – shows profile if logged in, opens login modal if not */}
              <Tooltip
                title={isLoggedIn ? "My Profile" : "Login / Register"}
                arrow
              >
                <IconButton
                  className="iconButton"
                  color="primary"
                  aria-label="user profile"
                  onClick={() => {
                    if (!isLoggedIn) {
                      openAuthModal("login");
                    }
                  }}
                  component={isLoggedIn ? Link : "button"}
                  href={isLoggedIn ? "/profile" : undefined}
                >
                  <Icon name="user" width={24} height={24} />
                </IconButton>
              </Tooltip>

              {/* Search */}
              <IconButton
                className="iconButton"
                color="primary"
                aria-label="search"
              >
                <Icon name="search" width={24} height={24} />
              </IconButton>

              {/* Cart with animated badge */}
              <Tooltip title="Shopping Cart" arrow>
                <IconButton
                  className="iconButton"
                  color="primary"
                  aria-label="shopping cart"
                  component={Link}
                  href="/cart"
                >
                  <Badge
                    badgeContent={cartCount}
                    invisible={cartCount === 0}
                    sx={cartBadgeSx}
                  >
                    <Icon name="headerCart" width={24} height={24} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>

            {/* Mobile Icons */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Tooltip title="Wishlist" arrow>
                <IconButton
                  className="iconButton"
                  aria-label="wishlist"
                  component={Link}
                  href="/wishlist"
                >
                  <Badge
                    badgeContent={wishlistCount}
                    invisible={wishlistCount === 0}
                    sx={wishlistBadgeSx}
                  >
                    <Icon name="headerWishlist" width={22} height={22} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Cart" arrow>
                <IconButton
                  className="iconButton"
                  aria-label="shopping cart"
                  component={Link}
                  href="/cart"
                >
                  <Badge
                    badgeContent={cartCount}
                    invisible={cartCount === 0}
                    sx={cartBadgeSx}
                  >
                    <Icon name="headerCart" width={22} height={22} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <IconButton
                className="iconButton"
                onClick={handleDrawerToggle}
                aria-label="open menu"
              >
                <Icon name="menu" width={20} height={20} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className="mobileMenuDrawerOuter"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "90%", sm: 400 },
            backgroundColor: "#ffffff",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
