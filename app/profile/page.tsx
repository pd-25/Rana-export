import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { logoutUser } from "@/app/actions/authActions";
import Link from "next/link";
import Icon from "@/components/ui/icon/Icon";
import BackgroundPattern from "@/public/collection/background-pattern.png";
import ProfileClient from "@/components/profile/ProfileClient";

export const metadata = {
  title: "My Profile | Rana Export",
};

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await (prisma as any).user.findUnique({
    where: { id: session.userId },
    include: {
      _count: {
        select: { cart: true, wishlist: true },
      },
    },
  });

  const orders = await (prisma as any).order.findMany({
    where: { userId: session.userId },
    include: {
      _count: {
        select: { items: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!user) {
    redirect("/login");
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", pb: 10 }}>
      {/* Header Banner Section */}
      <Box
        sx={{
          backgroundImage: `url(${BackgroundPattern.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pt: 10,
          pb: 15,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "linear-gradient(transparent, #F8F9FA)",
          },
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: "3rem",
                bgcolor: "#C0717A",
                color: "#fff",
                boxShadow: "0 8px 32px rgba(192, 113, 122, 0.2)",
                border: "4px solid #fff",
              }}
            >
              {userInitial}
            </Avatar>
            <Box textAlign={{ xs: "center", md: "left" }}>
              <Typography
                variant="h3"
                fontWeight="800"
                sx={{ mb: 1, color: "#2D2D2D" }}
              >
                Welcome back, {user.name}!
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#606060", opacity: 0.8 }}
              >
                Manage your account, track requests, and explore your curated
                collection.
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <form action={logoutUser}>
              <Button
                variant="outlined"
                color="error"
                type="submit"
                startIcon={<Icon name="logout" width={20} height={20} />}
                sx={{
                  borderRadius: 10,
                  px: 4,
                  bgcolor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(4px)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                Sign Out
              </Button>
            </form>
          </Stack>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", pb: 15 }}>
        <Grid container spacing={4}>
          {/* Quick Stats & Orders */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid #EAEAEA",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>
                  Your Activity
                </Typography>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "rgba(192, 113, 122, 0.05)",
                      borderRadius: 3,
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        p: 1,
                        bgcolor: "#fff",
                        borderRadius: 2,
                        display: "flex",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Icon name="headerCart" width={24} height={24} />
                    </Box>
                    <Box>
                      <Typography variant="h5" fontWeight="800">
                        {user._count.cart}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Items in Cart
                      </Typography>
                    </Box>
                    <Link
                      href="/cart"
                      passHref
                      style={{ marginLeft: "auto", textDecoration: "none" }}
                    >
                      <Button sx={{ minWidth: 0, color: "#C0717A" }}>
                        View
                      </Button>
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      bgcolor: "rgba(0, 0, 0, 0.03)",
                      borderRadius: 3,
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        p: 1,
                        bgcolor: "#fff",
                        borderRadius: 2,
                        display: "flex",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Icon name="headerWishlist" width={24} height={24} />
                    </Box>
                    <Box>
                      <Typography variant="h5" fontWeight="800">
                        {user._count.wishlist}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Saved Items
                      </Typography>
                    </Box>
                    <Link
                      href="/wishlist"
                      passHref
                      style={{ marginLeft: "auto", textDecoration: "none" }}
                    >
                      <Button sx={{ minWidth: 0, color: "#2D2D2D" }}>
                        View
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#fff",
                  boxShadow: "0 8px 32px rgba(45, 45, 45, 0.05)",
                  border: "1px solid #EAEAEA",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="700">
                    Order History
                  </Typography>
                  <Link
                    href="/orders"
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        color: "#C0717A",
                        borderColor: "#EAEAEA",
                        fontSize: "0.65rem",
                        py: 0.2,
                        minWidth: "auto",
                        px: 1.5,
                        "&:hover": {
                          borderColor: "#C0717A",
                          bgcolor: "rgba(192, 113, 122, 0.05)",
                        },
                      }}
                    >
                      View All
                    </Button>
                  </Link>
                </Box>
                {orders.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ py: 2 }}
                  >
                    No orders placed yet.
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {orders.slice(0, 3).map((order: any) => (
                      <Box
                        key={order.id}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid #F0F0F0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" fontWeight="700">
                            Order #{order.id.toString().padStart(5, "0")}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(order.createdAt).toLocaleDateString()} •{" "}
                            {order.status}
                          </Typography>
                        </Box>
                        <Link
                          href={`/orders/${order.id}`}
                          passHref
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 2, textTransform: "none" }}
                          >
                            View Order
                          </Button>
                        </Link>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Paper>
            </Stack>
          </Grid>

          {/* Account Details */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                border: "1px solid #EAEAEA",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                height: "100%",
              }}
            >
              <Typography variant="h5" fontWeight="800" sx={{ mb: 4 }}>
                Account Settings
              </Typography>

              <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 700,
                      }}
                    >
                      Full Name
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      sx={{ mt: 1, color: "#2D2D2D" }}
                    >
                      {user.name}
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                  </Box>
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 700,
                      }}
                    >
                      Email Address
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      sx={{ mt: 1, color: "#2D2D2D" }}
                    >
                      {user.email}
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 700,
                      }}
                    >
                      Member Since
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      sx={{ mt: 1, color: "#2D2D2D" }}
                    >
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                      })}
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                  </Box>
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontWeight: 700,
                      }}
                    >
                      Default Currency
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      sx={{ mt: 1, color: "#2D2D2D" }}
                    >
                      USD ($)
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, pt: 2 }}>
                <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>
                  Privacy & Security
                </Typography>
                <ProfileClient />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
