"use client"

import { useState } from "react"
import Link from "next/link"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"
import Icon from "@/components/ui/icon/Icon"
import styles from "./Header.module.css"
import Image from "next/image"
import logo from "@/public/rana-export-logo.svg"
import { navLinks, type NavLink } from "@/lib/constants"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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
        <Box className={styles.logoContainer}>
          <Image src={logo} alt="logo" width={60} height={60} className={styles.logoImage} />
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
            className={styles.mobileNavLink}
            onClick={handleDrawerToggle}
          >
            {link.name}
          </Link>
        ))}
      </Stack>
    </Box>
  )

  return (
    <Box component="header" className={styles.header}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2.5,
          }}
        >
          {/* Logo Section */}
          <Box className={styles.logoContainer}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <Image
                src={logo}
                alt="logo"
                width={60}
                height={60}
                className={styles.logoImage}
              />
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            {navLinks.map((link: NavLink) => (
              <Link
                key={link.name}
                href={link.href}
                className={styles.navLink}
              >
                {link.name}
              </Link>
            ))}
          </Box>

          {/* Desktop Utility Icons */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              className={styles.iconButton}
              aria-label="language selector"
            >
              <Icon name="flag" width={24} height={24} />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              aria-label="wishlist"
            >
              <Icon name="heart" width={24} height={24} />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              aria-label="user profile"
            >
              <Icon name="user" width={24} height={24} />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              aria-label="search"
            >
              <Icon name="search" width={24} height={24} />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              aria-label="shopping cart"
            >
              <Icon name="cart" width={24} height={24} />
            </IconButton>
          </Box>

          {/* Mobile Icons and Menu Button */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              className={styles.iconButton}
              aria-label="wishlist"
            >
              <Icon name="heart" width={20} height={20} />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              aria-label="user profile"
            >
              <Icon name="user" width={20} height={20} />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              aria-label="search"
            >
              <Icon name="search" width={20} height={20} />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              aria-label="shopping cart"
            >
              <Icon name="cart" width={20} height={20} />
            </IconButton>
            <IconButton
              className={styles.iconButton}
              onClick={handleDrawerToggle}
              aria-label="open menu"
            >
              <Icon name="menu" width={20} height={20} />
            </IconButton>
          </Box>
        </Box>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "80%", sm: 400 },
            backgroundColor: "#ffffff",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}
