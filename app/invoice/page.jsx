"use client";

import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "@/public/rana-export-logo.svg";
import logo2 from "@/public/start.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  placeOrder,
  getOrderItems,
  getOrderDetails,
} from "@/app/actions/orderActions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import BackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/CheckCircle";
import { getCartItems } from "@/app/actions/cartActions";

const THEME_MAROON = "#8B1E2B";
const BORDER_COLOR = "#D1D5DB";

function InvoiceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  // Status check
  const isReview = searchParams.get("status") === "review";
  const orderId = searchParams.get("orderId");
  const isSuccess = searchParams.get("success") === "true";
  const [showDetails, setShowDetails] = useState(false);

  // Auto-show details if not a success screen
  useEffect(() => {
    if (!isSuccess) setShowDetails(true);
  }, [isSuccess]);

  useEffect(() => {
    async function fetchItems() {
      setLoadingItems(true);
      try {
        if (isReview) {
          const cartItems = await getCartItems();
          setItems(cartItems);
        } else if (orderId && !isNaN(parseInt(orderId))) {
          const [itemsData, detailsData] = await Promise.all([
            getOrderItems(parseInt(orderId)),
            getOrderDetails(parseInt(orderId)),
          ]);
          setItems(itemsData || []);
          setOrderDetails(detailsData);
        }
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoadingItems(false);
      }
    }
    fetchItems();
  }, [isReview, orderId]);

  // Extract data with fallback to orderDetails or query params
  const name = isReview
    ? searchParams.get("name") || "Editable"
    : orderDetails?.customerName || orderDetails?.customer?.name || "N/A";
  const email = isReview
    ? searchParams.get("email") || "Editable"
    : orderDetails?.customer?.email || "N/A";
  const phone = isReview
    ? searchParams.get("phone") || "Editable"
    : orderDetails?.customerPhone || orderDetails?.customer?.phone || "N/A";
  const taxId = isReview ? searchParams.get("taxId") || "Editable" : "N/A";
  const address = isReview
    ? searchParams.get("address") || "Editable"
    : orderDetails?.customerAddress || orderDetails?.customer?.address || "N/A";
  const zipCode = isReview ? searchParams.get("zipCode") || "Editable" : "N/A";
  const website = isReview ? searchParams.get("website") || "Editable" : "N/A";

  const shippingMode = isReview
    ? searchParams.get("shippingMode") || "Door to Door"
    : "Door to Door";
  const nearestPort = isReview
    ? searchParams.get("nearestPort") || "Port Name"
    : "Port Name";
  const chaDetails = isReview
    ? searchParams.get("chaDetails") || "Custom House Agent Name"
    : "N/A";

  const handleConfirm = async () => {
    setConfirming(true);
    setError(null);
    try {
      const formData = new FormData();
      searchParams.forEach((value, key) => {
        formData.append(key, value);
      });

      const result = await placeOrder(formData);

      if (result.error) {
        setError(result.error);
        setConfirming(false);
      } else {
        router.push(`/invoice?orderId=${result.orderId}&success=true`);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setConfirming(false);
    }
  };

  // ── Print invoice in a clean popup window ──
  const triggerPrint = () => {
    const invoiceEl = document.querySelector(".invoice-print-area");
    if (!invoiceEl) return;

    // Collect all <style> and <link rel="stylesheet"> from the parent page
    const styleNodes = Array.from(
      document.head.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((el) => el.outerHTML)
      .join("\n");

    const popup = window.open("", "_blank", "width=1400,height=900");
    if (!popup) return;

    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Invoice RETH#${orderId}</title>
          ${styleNodes}
          <style>
            *, *::before, *::after {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: #fff !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
            }
            /* Remove MUI Paper overflow restriction & stretch to 100% A4 Landscape */
            .invoice-print-area {
              width: 100% !important;
              overflow: visible !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              min-height: 100vh !important;
              height: 100% !important;
            }
            
            /* Force the final pink box to lock to the absolute bottom if content is short */
            .invoice-print-area > div:last-child {
              margin-top: auto !important;
            }
            
            /* Squeeze internal paddings and heights explicitly */
            .invoice-print-area .MuiBox-root {
              padding-top: 8px !important;
              padding-bottom: 8px !important;
            }
            
            /* Squeeze the grid gaps */
            .invoice-print-area [class*="MuiBox"] {
              gap: 4px !important;
              min-height: 24px !important;
            }

            @page {
              size: A4 landscape;
              margin: 4mm 6mm;
            }
          </style>
        </head>
        <body>
          ${invoiceEl.outerHTML}
        </body>
      </html>
    `);
    popup.document.close();

    // Wait for images/fonts to load then print
    popup.onload = () => {
      setTimeout(() => {
        popup.focus();
        popup.print();
        popup.close();
      }, 400);
    };

    // Fallback if onload already fired
    setTimeout(() => {
      if (!popup.closed) {
        popup.focus();
        popup.print();
        popup.close();
      }
    }, 1200);
  };

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Box
      className="invoice-page-wrapper"
      sx={{
        bgcolor: "#FBF7F4",
        pb: isSuccess && !showDetails ? 0 : 10,
        minHeight: isSuccess && !showDetails ? "auto" : "100vh",
      }}
    >
      {isReview && (
        <Box
          className="no-print"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            bgcolor: "#2D2D2D",
            color: "#fff",
            p: 1.5,
            borderBottom: "4px solid #C0717A",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            marginBottom: "20px",
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="900"
                  sx={{ color: "#E19B8E" }}
                >
                  INVOICE PREVIEW MODE
                </Typography>
                <Typography variant="caption" sx={{ color: "#aaa" }}>
                  Please review all details below. Click "Confirm" to finalize
                  your order.
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => router.back()}
                  disabled={confirming}
                  variant="outlined"
                  startIcon={<BackIcon />}
                  sx={{
                    borderColor: "#555",
                    color: "#fff",
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Edit Details
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={confirming}
                  variant="contained"
                  startIcon={
                    confirming ? <CircularProgress size={18} /> : <CheckIcon />
                  }
                  sx={{
                    bgcolor: "#C0717A",
                    px: 4,
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#A85D66" },
                  }}
                >
                  {confirming ? "Confirming..." : "Confirm & Place Order"}
                </Button>
              </Stack>
            </Stack>
            {error && (
              <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                {error}
              </Alert>
            )}
          </Container>
        </Box>
      )}

      {isSuccess && (
        <Box
          className="no-print"
          sx={{
            py: 6,
            bgcolor: "#fff",
            borderBottom: "1px solid #EAEAEA",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                mb: 3,
                display: "inline-flex",
                bgcolor: "#E7F5E9",
                p: 3,
                borderRadius: "50%",
                animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "@keyframes popIn": {
                  "0%": { transform: "scale(0)", opacity: 0 },
                  "100%": { transform: "scale(1)", opacity: 1 },
                },
              }}
            >
              <CheckIcon sx={{ color: "#2E7D32", fontSize: 60 }} />
            </Box>

            <Typography
              variant="h3"
              fontWeight="900"
              sx={{
                color: "#1B5E20",
                mb: 1,
                letterSpacing: "-1px",
                textTransform: "uppercase",
              }}
            >
              Thank You!
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{ color: "#444", mb: 1 }}
            >
              Your Enquiry Has Been Placed!
            </Typography>
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{ color: "#444", mb: 3 }}
            >
              Order ID: RETH# {orderId}
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "#666", maxWidth: "600px", mx: "auto", mb: 5 }}
            >
              We've received your request and will get back to you shortly. In
              the meantime, you can download your invoice or head back to the
              store.
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              {!showDetails && (
                <Button
                  variant="contained"
                  onClick={() => setShowDetails(true)}
                  startIcon={
                    <Box component="span" sx={{ fontSize: 20 }}>
                      📄
                    </Box>
                  }
                  sx={{
                    bgcolor: "#2D2D2D",
                    px: 5,
                    py: 1.5,
                    borderRadius: 10,
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#000" },
                  }}
                >
                  View Invoice
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => {
                  if (!showDetails) {
                    setShowDetails(true);
                    setTimeout(() => triggerPrint(), 400);
                  } else {
                    triggerPrint();
                  }
                }}
                startIcon={
                  <Box component="span" sx={{ fontSize: 20 }}>
                    🖨️
                  </Box>
                }
                sx={{
                  bgcolor: "#C0717A",
                  px: 5,
                  py: 1.5,
                  borderRadius: 10,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#A85D66" },
                }}
              >
                Download Invoice
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push("/")}
                sx={{
                  color: "#2D2D2D",
                  borderColor: "#2D2D2D",
                  px: 5,
                  py: 1.5,
                  borderRadius: 10,
                  fontWeight: "bold",
                  "&:hover": { borderColor: "#000", bgcolor: "#F5F5F5" },
                }}
              >
                Back to Products
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push("/profile")}
                sx={{
                  color: "#2D2D2D",
                  borderColor: "#2D2D2D",
                  px: 5,
                  py: 1.5,
                  borderRadius: 10,
                  fontWeight: "bold",
                  "&:hover": { borderColor: "#000", bgcolor: "#F5F5F5" },
                }}
              >
                View My Orders
              </Button>
            </Stack>
          </Container>
        </Box>
      )}

      <Container maxWidth="lg" sx={{ p: 0, mt: isReview ? 4 : 0 }}>
        {showDetails && (
          <Paper
            elevation={0}
            className="invoice-print-area"
            sx={{
              borderRadius: 0,
              border: "1px solid #ddd",
              overflow: "hidden",
            }}
          >
            {/* Top Header */}
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                background: "#F6EDD9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Image
                  src={logo}
                  alt="Rana Export Logo"
                  width={180}
                  height={70}
                />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: THEME_MAROON,
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  mx: 2,
                  flex: 1,
                  fontSize: "24px",
                  my: 0,
                }}
              >
                PURCHASE ENQUIRIES FROM OVERSEAS BUYERS
              </Typography>

              <Box sx={{ textAlign: "center", width: 120 }}>
                <Image
                  src={logo2}
                  alt="Rana Export Logo"
                  width={68}
                  height={67}
                />
              </Box>
            </Box>

            {/* Company & Info Section */}
            <Box
              sx={{
                display: "flex",
                borderBottom: `1px solid #eee`,
                alignItems: "stretch",
                position: "relative",
              }}
            >
              {/* Left: Company Details */}
              <Box
                sx={{
                  flex: "1 1 38%",
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    color: "#000",
                    mb: 1,
                    fontSize: "16px",
                    letterSpacing: "0.2px",
                  }}
                >
                  RANA EXPORT TRADING HOUSE
                </Typography>
                <Box
                  sx={{
                    fontSize: "0.85rem",
                    color: "#444",
                    lineHeight: 1.4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.2,
                  }}
                >
                  <Typography variant="inherit">
                    Ramjibanpur, Paschim Mednipur,
                  </Typography>
                  <Typography variant="inherit">
                    Zip Code - 721242, WB, INDIA
                  </Typography>
                  <Typography variant="inherit">
                    T: 0091 9002929605 (WhatsApp)
                  </Typography>
                  <Typography variant="inherit">
                    E: tibetansingingbowl1@gmail.com
                  </Typography>
                  <Typography variant="inherit">
                    W: www.ranaexports.com
                  </Typography>
                  <Typography
                    variant="inherit"
                    sx={{ fontWeight: "bold", color: "#000", mt: 0.5 }}
                  >
                    Contact Person : Chandi Rana
                  </Typography>
                </Box>
              </Box>

              {/* Dash Line 1 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                }}
              >
                <Box
                  sx={{
                    height: "80%",
                    borderRight: "1.5px dashed #BF5B5B",
                  }}
                />
              </Box>

              {/* Middle: Enquiry Details Block */}
              <Box
                sx={{
                  flex: "0 0 380px",
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    // border: "1px solid #FAD7D2",
                    borderRadius: 0,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "rgba(253, 233, 230, 0.9)",
                      p: 1.2,
                      px: 1.5,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: "0.83rem" }}>
                      Enquary No.
                    </Typography>
                    <Typography sx={{ fontSize: "0.83rem", color: "#333" }}>
                      RETH# {orderId || "PREVIEW-001"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "rgba(254, 245, 231, 0.9)",
                      p: 1.2,
                      px: 1.5,
                      borderTop: "1px solid #FAD7D2",
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: "0.83rem" }}>
                      Date
                    </Typography>
                    <Typography sx={{ fontSize: "0.83rem", color: "#333" }}>
                      {today}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Dash Line 2 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                }}
              >
                <Box
                  sx={{
                    height: "80%",
                    borderRight: "1.5px dashed #BF5B5B",
                  }}
                />
              </Box>

              {/* Right: Terms Grid */}
              <Box
                sx={{
                  flex: "1 1 38%",
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 1,
                    px: 2,
                  }}
                >
                  {[
                    ["Payment Terms", "Advance (100%)"],
                    ["Shipping From", "Ramjibanpur, W.B."],
                    ["Shipping Port", "Kolkata, W.B."],
                    ["Shipping Terms", "Prepaid"],
                  ].map(([label, value]) => (
                    <React.Fragment key={label}>
                      <Typography
                        sx={{
                          color: "#444",
                          fontWeight: 400,
                          fontSize: "0.85rem",
                        }}
                      >
                        {label}
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
                        {value}
                      </Typography>
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Customer & Ship To Section */}
            <Box
              sx={{
                display: "flex",
                borderTop: "1.2px dotted #BF5B5B",
                borderBottom: "1.2px dotted #BF5B5B",
                alignItems: "stretch",
                position: "relative",
                py: 2,
              }}
            >
              {/* Left: Customer Details */}
              <Box
                sx={{
                  flex: 1,
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 900,
                    color: THEME_MAROON,
                    mb: 2.5,
                    // borderBottom: `2.5px solid ${THEME_MAROON}`,
                    display: "inline-block",
                    width: "fit-content",
                    textTransform: "uppercase",
                    pb: 0.5,
                    fontSize: "0.95rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  CUSTOMER/VENDOR DETAILS:
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}
                >
                  {[
                    { label: "Name", value: name },
                    { label: "Tax ID if any", value: taxId },
                    { label: "Address", value: address },
                    {
                      label: "ZIP Code",
                      value: zipCode,
                      sub:
                        zipCode === "Editable"
                          ? "(Provided by the client)"
                          : "",
                    },
                    {
                      label: "Contact No.",
                      value: phone,
                    },
                    { label: "Email", value: email },
                    { label: "Website", value: website },
                  ].map((field) => (
                    <Box
                      key={field.label}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "140px 1fr",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.85rem", fontWeight: "bold" }}
                      >
                        {field.label}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: "#FEF5E7",
                          p: 0.8,
                          px: 1.5,
                          borderRadius: 0,
                          fontSize: "0.85rem",
                          color: "#333",
                          border: "1px solid #FAD7D2",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          height: "36px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "inline-block",
                          }}
                        >
                          {field.value}
                        </Box>
                        {field.sub && (
                          <Typography
                            component="span"
                            sx={{
                              fontSize: "0.85rem",
                              color: "#888",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {field.sub}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Vertical Dash Line */}
                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "5%",
                    bottom: "5%",
                    width: "1px",
                    borderRight: "1.5px dashed #BF5B5B",
                  }}
                />
              </Box>

              {/* Right: Ship To Details */}
              <Box sx={{ flex: 1, p: 2.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 900,
                    color: THEME_MAROON,
                    mb: 2.5,
                    // borderBottom: `2.5px solid ${THEME_MAROON}`,
                    display: "inline-block",
                    width: "fit-content",
                    textTransform: "uppercase",
                    pb: 0.5,
                    fontSize: "0.95rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  SHIP TO:
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}
                >
                  {[
                    {
                      label: "Shipping Mode",
                      value: shippingMode,
                      sub: shippingMode === "Door to Door" ? "Drop Down" : "",
                      isDropdown: true,
                    },
                    {
                      label: "Nearest Port",
                      value: nearestPort,
                      sub:
                        nearestPort === "Port Name" ? "(Input by client)." : "",
                    },
                    {
                      label: "Zip Code",
                      value:
                        zipCode === "Editable"
                          ? "Auto Fetch from Customer Details/Editable"
                          : zipCode,
                    },
                    {
                      label: "Your CHA Details",
                      value: chaDetails,
                      sub:
                        chaDetails === "Custom House Agent Name"
                          ? "(Input should be optional for customer)."
                          : "",
                    },
                    {
                      label: "Address",
                      value:
                        address === "Editable"
                          ? "Auto Fetch from Customer Details/Editable"
                          : address,
                    },
                    {
                      label: "Contact No.",
                      value:
                        phone === "Editable"
                          ? "Auto Fetch from Customer Details/Editable"
                          : phone,
                    },
                    {
                      label: "Email",
                      value:
                        email === "Editable"
                          ? "Auto Fetch from Customer Details/Editable"
                          : email,
                    },
                  ].map((field) => (
                    <Box
                      key={field.label}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "140px 1fr",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.85rem", fontWeight: "bold" }}
                      >
                        {field.label}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: "#FEF5E7",
                          p: 0.8,
                          px: 1.5,
                          borderRadius: 0,
                          fontSize: "0.85rem",
                          color: "#333",
                          border: "1px solid #FAD7D2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: "36px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "inline-block",
                            }}
                          >
                            {field.value}
                          </Box>
                          {field.sub && (
                            <Typography
                              component="span"
                              sx={{
                                fontSize: "0.85rem",
                                color: field.isDropdown ? "#BF5B5B" : "#888",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {field.sub}
                            </Typography>
                          )}
                        </Box>
                        {field.isDropdown && (
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#BF5B5B" }}
                          >
                            ▼
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Details Table */}
            <Box sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 900,
                  color: THEME_MAROON,
                  mb: 2.5,
                  display: "inline-block",
                  width: "fit-content",
                  textTransform: "uppercase",
                  pb: 0.5,
                  fontSize: "0.95rem",
                  letterSpacing: "0.5px",
                }}
              >
                PURCHASE ORDER/ENQUIRE DETAILS:
              </Typography>

              <TableContainer
                component={Box}
                sx={{
                  borderRadius: 0,
                  overflow: "hidden",
                }}
              >
                <Table
                  size="small"
                  sx={{
                    borderCollapse: "collapse",
                    "& th, & td": {
                      border: "1px dotted #BF5B5B",
                      fontSize: "0.85rem",
                      p: 0.8,
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          width: 80,
                          fontWeight: 900,
                          bgcolor: "#F9B9A554",
                        }}
                      >
                        SL. NO.
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: 140,
                          fontWeight: 900,
                          bgcolor: "#FCF3E0",
                        }}
                      >
                        SKU
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 900,
                          bgcolor: "#F9B9A554",
                        }}
                      >
                        PRODUCT NAME
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: 110,
                          fontWeight: 900,
                          bgcolor: "#FCF3E0",
                        }}
                      >
                        SIZE
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: 130,
                          fontWeight: 900,
                          bgcolor: "#F9B9A554",
                        }}
                      >
                        QTY/UNITS
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: 130,
                          fontWeight: 900,
                          bgcolor: "#FCF3E0",
                        }}
                      >
                        WEIGHT/UNIT
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: 150,
                          fontWeight: 900,
                          bgcolor: "#F9B9A554",
                        }}
                      >
                        TOTAL WEIGHT
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loadingItems ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                          <CircularProgress size={24} />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Loading items...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : items.length > 0 ? (
                      items.map((item, index) => {
                        const product = item.product;
                        const variant =
                          product?.variants?.find(
                            (v) => v.id === item.variantId,
                          ) || product?.variants?.[0];
                        const data = variant?.data || {};
                        const size = data["Size (cm)"] || data["Size"] || "-";
                        const weightStr = (
                          data["Weight (gm)"] ||
                          data["Weight"] ||
                          "0"
                        ).toString();
                        const cleanWeight = weightStr.replace(/[^0-9.]/g, "");
                        const weightValue = parseFloat(cleanWeight);
                        const totalWeight = !isNaN(weightValue)
                          ? (weightValue * item.quantity).toFixed(0)
                          : "-";

                        return (
                          <TableRow key={item.id}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">
                              {data?.SKU || data?.sku || product?.sku || "-"}
                            </TableCell>
                            <TableCell>
                              {product?.name || "N/A"} -{" "}
                              {product.variants?.[0]?.data &&
                                Object.entries(product.variants[0].data)
                                  .filter(
                                    ([key]) =>
                                      ![
                                        "EAN",
                                        "SKU",
                                        "Model No",
                                        "variantImage",
                                      ].includes(key),
                                  )
                                  .slice(0, 2)
                                  .map(([key, value]) => (
                                    <>
                                      {key}:{String(value)}
                                      {"; "}
                                    </>
                                  ))}
                            </TableCell>
                            <TableCell align="center">{size}</TableCell>
                            <TableCell align="center">
                              {item.quantity}
                            </TableCell>
                            <TableCell align="center">
                              {weightStr <= 0 ? "-" : weightStr}
                            </TableCell>
                            <TableCell align="center">
                              {totalWeight <= 0 ? "-" : totalWeight}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                          No items found
                        </TableCell>
                      </TableRow>
                    )}
                    {!loadingItems &&
                      items.length < 30 &&
                      Array.from({ length: 25 - items.length }).map((_, i) => (
                        <TableRow key={`filler-${i}`} sx={{ height: 28 }}>
                          <TableCell align="center">
                            {items.length + i + 1}
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box
              sx={{
                height: 40,
                bgcolor: "#E19B8E5E",
                borderTop: "1px solid #E19B8E5E",
              }}
            />
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default function InvoicePage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ p: 5, textAlign: "center" }}>
          <Typography>Loading Invoice...</Typography>
        </Box>
      }
    >
      <InvoiceContent />
    </Suspense>
  );
}
