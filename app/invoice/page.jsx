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

function InvoiceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Status check
  const isReview = searchParams.get("status") === "review";
  const orderId = searchParams.get("orderId");
  const isSuccess = searchParams.get("success") === "true";
  const [showDetails, setShowDetails] = useState(true);

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
          setItems(cartItems || []);
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

  // Handle auto-download trigger
  useEffect(() => {
    if (
      searchParams.get("download") === "true" &&
      showDetails &&
      !loadingItems &&
      items.length > 0
    ) {
      const timer = setTimeout(() => {
        triggerPrint();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, showDetails, loadingItems, items]);

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

  const triggerPrint = () => {
    const currentType =
      allPages && allPages[currentPage] ? allPages[currentPage].type : "table";

    const invoiceEl = document.querySelector(".invoice-print-container");
    if (!invoiceEl) return;

    const filteredPagesHtml = Array.from(
      invoiceEl.querySelectorAll(".invoice-print-area"),
    )
      .filter((_, idx) => allPages[idx]?.type === currentType)
      .map((el) => {
        // Ensure they are visible in print even if hidden in web view
        const clone = el.cloneNode(true);
        clone.style.display = "flex";
        return clone.outerHTML;
      })
      .join("");

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
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            }
            .invoice-print-area {
              width: 100% !important;
              overflow: visible !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              min-height: 296mm !important;
              height: auto !important;
            }
            .invoice-print-area:not(:last-child) {
              page-break-after: always !important;
            }
            .invoice-print-area > div:last-child {
              margin-top: auto !important;
            }
            @page {
              size: A4 portrait;
              margin: 0;
            }
            @media print {
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-print-container">
            ${filteredPagesHtml}
          </div>
        </body>
      </html>
    `);
    popup.document.close();

    popup.onload = () => {
      setTimeout(() => {
        popup.focus();
        popup.print();
        popup.close();
      }, 400);
    };
  };

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const firstPageSize = 6;
  const otherPagesSize = 25;
  const pages = [];
  if (items && items.length > 0) {
    pages.push(items.slice(0, firstPageSize));
    for (let i = firstPageSize; i < items.length; i += otherPagesSize) {
      pages.push(items.slice(i, i + otherPagesSize));
    }
  } else if (!loadingItems) {
    pages.push([]);
  }

  const imageFirstPageSize = 8;
  const imageOtherPagesSize = 12;
  const imagePages = [];
  if (items && items.length > 0) {
    imagePages.push(items.slice(0, imageFirstPageSize));
    for (
      let i = imageFirstPageSize;
      i < items.length;
      i += imageOtherPagesSize
    ) {
      imagePages.push(items.slice(i, i + imageOtherPagesSize));
    }
  }

  const allPages = [
    ...pages.map((p, i) => ({ type: "table", items: p, sectionPageIndex: i })),
    ...imagePages.map((p, i) => ({
      type: "image",
      items: p,
      sectionPageIndex: i,
    })),
  ];

  const navigationButtons = (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={2}
      sx={{ mt: 3, mb: 5, flexWrap: "wrap", gap: 2 }}
      className="no-print"
    >
      <Button
        variant="contained"
        onClick={() => {
          const idx = allPages.findIndex((p) => p.type === "table");
          if (idx !== -1) setCurrentPage(idx);
          setShowDetails(true);
        }}
        sx={{
          borderRadius: "8px",
          px: 4,
          minWidth: 160,
          height: 48,
          bgcolor:
            allPages[currentPage]?.type === "table" ? THEME_MAROON : "#2B2B2B",
          color: "#fff",
          fontWeight: 700,
          textTransform: "none",
          "&:hover": {
            bgcolor:
              allPages[currentPage]?.type === "table" ? "#6A1621" : "#444",
          },
        }}
      >
        Table View
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          const idx = allPages.findIndex((p) => p.type === "image");
          if (idx !== -1) setCurrentPage(idx);
          setShowDetails(true);
        }}
        sx={{
          borderRadius: "8px",
          px: 4,
          minWidth: 160,
          height: 48,
          bgcolor:
            allPages[currentPage]?.type === "image" ? THEME_MAROON : "#2B2B2B",
          color: "#fff",
          fontWeight: 700,
          textTransform: "none",
          "&:hover": {
            bgcolor:
              allPages[currentPage]?.type === "image" ? "#6A1621" : "#444",
          },
        }}
      >
        Image View
      </Button>
      <Button
        variant="contained"
        onClick={triggerPrint}
        sx={{
          borderRadius: "8px",
          px: 4,
          minWidth: 180,
          height: 48,
          bgcolor: THEME_MAROON,
          color: "#fff",
          fontWeight: 700,
          textTransform: "none",
          "&:hover": { bgcolor: "#6A1621" },
        }}
      >
        Download Invoice
      </Button>
    </Stack>
  );

  return (
    <Box
      className="invoice-page-wrapper"
      sx={{
        bgcolor: "#FBF7F4",
        pb: isSuccess && !showDetails ? 0 : 10,
        pt: isSuccess ? 0 : 10,
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
            mb: 4,
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                fontWeight="900"
                sx={{ color: "#E19B8E" }}
              >
                INVOICE PREVIEW MODE
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => router.back()}
                  disabled={confirming}
                  variant="outlined"
                  sx={{ color: "#fff", borderColor: "#555" }}
                >
                  Edit Details
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={confirming}
                  variant="contained"
                  sx={{ bgcolor: "#C0717A" }}
                >
                  {confirming ? "Confirming..." : "Confirm & Place Order"}
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}

      {isSuccess && (
        <Box
          className="no-print"
          sx={{
            py: 6,
            bgcolor: "#fff",
            textAlign: "center",
            borderBottom: "1px solid #EAEAEA",
            mb: 4,
          }}
        >
          <Container maxWidth="md">
            <CheckIcon sx={{ color: "#2E7D32", fontSize: 60, mb: 2 }} />
            <Typography
              variant="h3"
              fontWeight="900"
              sx={{ color: "#1B5E20", mb: 1 }}
            >
              Thank You!
            </Typography>
            <Typography variant="h6" sx={{ color: "#444", mb: 4 }}>
              Order ID: RETH# {orderId}
            </Typography>
            {navigationButtons}
          </Container>
        </Box>
      )}

      <Container
        maxWidth="lg"
        sx={{ p: 0 }}
        className="invoice-print-container"
      >
        {showDetails &&
          allPages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              <Paper
                className={`invoice-print-area ${pageIndex === currentPage ? "active" : ""}`}
                sx={{
                  borderRadius: 0,
                  border: "1px solid #ddd",
                  overflow: "hidden",
                  mb: 4,
                  display: {
                    xs:
                      allPages[pageIndex].type === allPages[currentPage]?.type
                        ? "flex"
                        : "none",
                    print: "flex !important",
                  },
                  flexDirection: "column",
                  minHeight: "296mm",
                }}
              >
                {/* 1. Top Header (EVERY PAGE) */}
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

                {/* 2. Company & Info Section (PAGE 1 of EACH SECTION ONLY) */}
                {page.sectionPageIndex === 0 && (
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
                          <Typography
                            sx={{ fontWeight: 700, fontSize: "0.83rem" }}
                          >
                            Enquary No.
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.83rem", color: "#333" }}
                          >
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
                          <Typography
                            sx={{ fontWeight: 700, fontSize: "0.83rem" }}
                          >
                            Date
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.83rem", color: "#333" }}
                          >
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
                            <Typography
                              sx={{ fontWeight: 600, fontSize: "0.85rem" }}
                            >
                              {value}
                            </Typography>
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* 3. Customer & Ship To Section (TABLE PAGE 1 ONLY) */}
                {page.type === "table" && page.sectionPageIndex === 0 && (
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
                          textTransform: "uppercase",
                          fontSize: "0.95rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        CUSTOMER/VENDOR DETAILS:
                      </Typography>
                      <Stack spacing={1.2}>
                        {[
                          ["Name", name],
                          ["Tax ID if any", taxId],
                          ["Address", address],
                          ["ZIP Code", zipCode],
                          ["Contact No.", phone],
                          ["Email", email],
                          ["Website", website],
                        ].map(([label, val]) => (
                          <Box
                            key={label}
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "140px 1fr",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "0.85rem", fontWeight: "bold" }}
                            >
                              {label}
                            </Typography>
                            <Box
                              sx={{
                                bgcolor: "#FEF5E7",
                                p: 0.8,
                                px: 1.5,
                                fontSize: "0.85rem",
                                color: "#333",
                                border: "1px solid #FAD7D2",
                                height: "36px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {val}
                            </Box>
                          </Box>
                        ))}
                      </Stack>
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
                          textTransform: "uppercase",
                          fontSize: "0.95rem",
                          letterSpacing: "0.5px",
                        }}
                      >
                        SHIP TO:
                      </Typography>
                      <Stack spacing={1.2}>
                        {[
                          ["Shipping Mode", shippingMode],
                          ["Nearest Port", nearestPort],
                          ["Zip Code", zipCode],
                          ["Your CHA Details", chaDetails],
                          ["Address", address],
                          ["Contact No.", phone],
                          ["Email", email],
                        ].map(([label, val]) => (
                          <Box
                            key={label}
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "140px 1fr",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "0.85rem", fontWeight: "bold" }}
                            >
                              {label}
                            </Typography>
                            <Box
                              sx={{
                                bgcolor: "#FEF5E7",
                                p: 0.8,
                                px: 1.5,
                                fontSize: "0.85rem",
                                color: "#333",
                                border: "1px solid #FAD7D2",
                                height: "36px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {val}
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                )}

                {/* 4. Content Section (Varies by Page Type) */}
                {page.type === "table" ? (
                  <Box sx={{ p: 2.5, flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 900,
                        color: THEME_MAROON,
                        mb: 2.5,
                        textTransform: "uppercase",
                        fontSize: "0.95rem",
                        letterSpacing: "0.5px",
                      }}
                    >
                      PURCHASE ORDER/ENQUIRE DETAILS:
                    </Typography>
                    <TableContainer
                      sx={{ borderRadius: 0, overflow: "hidden" }}
                    >
                      <Table
                        size="small"
                        sx={{
                          borderCollapse: "collapse",
                          "& th, & td": {
                            border: "1.2px dotted #BF5B5B",
                            fontSize: "0.85rem",
                            p: 0.8,
                          },
                        }}
                      >
                        <TableHead>
                          <TableRow sx={{ bgcolor: "#FEF5E7" }}>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: 900,
                                width: "60px",
                                color: THEME_MAROON,
                              }}
                            >
                              SL. NO.
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: 900,
                                width: "90px",
                                color: THEME_MAROON,
                              }}
                            >
                              SKU
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: 900,
                                width: "220px",
                                color: THEME_MAROON,
                              }}
                            >
                              PRODUCT NAME
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: 900,
                                width: "100px",
                                color: THEME_MAROON,
                              }}
                            >
                              SIZE
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: 900,
                                width: "100px",
                                color: THEME_MAROON,
                              }}
                            >
                              QTY/UNITS
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: 900,
                                width: "120px",
                                color: THEME_MAROON,
                              }}
                            >
                              WEIGHT/UNIT
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: 900,
                                width: "120px",
                                color: THEME_MAROON,
                              }}
                            >
                              TOTAL WEIGHT
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {page.items.map((item, idx) => {
                            const globalIndex =
                              pages
                                .slice(0, page.sectionPageIndex)
                                .reduce((acc, p) => acc + p.length, 0) +
                              idx +
                              1;
                            const data =
                              item.product?.variants?.[0]?.data || {};
                            const weight = parseFloat(
                              (data["Weight (gm)"] || data["Weight"] || "0")
                                .toString()
                                .replace(/[^0-9.]/g, ""),
                            );
                            return (
                              <TableRow key={item.id}>
                                <TableCell align="center">
                                  {globalIndex}
                                </TableCell>
                                <TableCell align="center">
                                  {data.SKU ||
                                    data.sku ||
                                    item.product?.sku ||
                                    "-"}
                                </TableCell>
                                <TableCell>
                                  {item.product?.name || "N/A"}
                                </TableCell>
                                <TableCell align="center">
                                  {data["Size (cm)"] || data["Size"] || "-"}
                                </TableCell>
                                <TableCell align="center">
                                  {item.quantity}
                                </TableCell>
                                <TableCell align="center">
                                  {weight > 0 ? weight : "-"}
                                </TableCell>
                                <TableCell align="center">
                                  {weight > 0
                                    ? (weight * item.quantity).toFixed(0)
                                    : "-"}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          {/* Filler Rows */}
                          {Array.from({
                            length:
                              (page.sectionPageIndex === 0
                                ? firstPageSize
                                : otherPagesSize) - page.items.length,
                          }).map((_, i) => (
                            <TableRow key={`filler-${i}`} sx={{ height: 38 }}>
                              <TableCell align="center">
                                {pages
                                  .slice(0, page.sectionPageIndex)
                                  .reduce((acc, p) => acc + p.length, 0) +
                                  page.items.length +
                                  i +
                                  1}
                              </TableCell>
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell />
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ) : (
                  /* IMAGE GALLERY VIEW */
                  <Box sx={{ p: 2.5, flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 900,
                        color: THEME_MAROON,
                        mb: 2.5,
                        textTransform: "uppercase",
                        fontSize: "0.95rem",
                        letterSpacing: "0.5px",
                        textAlign: "center",
                      }}
                    >
                      PURCHASE ORDER/ENQUIRE DETAILS: IMAGES WITH SKU CODE
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 2,
                      }}
                    >
                      {page.items.map((item) => {
                        const data = item.product?.variants?.[0]?.data || {};
                        const sku =
                          data.SKU || data.sku || item.product?.sku || "-";
                        const name = item.product?.name || "N/A";
                        return (
                          <Box
                            key={item.id}
                            sx={{
                              border: "1px solid #EAEAEA",
                              borderRadius: "4px",
                              overflow: "hidden",
                              display: "flex",
                              flexDirection: "column",
                              bgcolor: "#fff",
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: "#FEF5E7",
                                p: 1,
                                textAlign: "center",
                                borderBottom: "1px solid #EAEAEA",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                  color: THEME_MAROON,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {sku} | {name}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                p: 1.5,
                                height: 200,
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {item.product?.mainImage ? (
                                <Box
                                  component="img"
                                  src={item.product.mainImage}
                                  alt={name}
                                  sx={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              ) : (
                                <Typography
                                  variant="caption"
                                  color="text.disabled"
                                >
                                  No Image
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                {/* 5. Note Section (FINAL TABLE PAGE ONLY) */}
                {page.type === "table" && pageIndex === pages.length - 1 && (
                  <Box
                    sx={{
                      p: 2.5,
                      bgcolor: "#FEF5E7",
                      borderTop: "1.2px dotted #BF5B5B",
                      marginTop: "7px",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 900, color: THEME_MAROON, mb: 1.2 }}
                    >
                      NOTE:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "#333",
                        mb: 1.2,
                        lineHeight: 1.6,
                      }}
                    >
                      Thanking for your valuable time for enquire. I will send
                      estimate bill with cost of goods, packing charges &
                      shipping charges as soon as possible.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "#333",
                        lineHeight: 1.6,
                      }}
                    >
                      Also know you expect time of delivery (** It will be
                      pushed down to the last page of the enquary). After Thanks
                      for the enquiry message.
                    </Typography>
                  </Box>
                )}

                {/* 6. Bottom Bar (EVERY PAGE) */}
                <Box
                  sx={{
                    height: 40,
                    bgcolor: "#FFE5DB",
                    borderTop: "1px solid #eee",
                    mt: "auto",
                  }}
                />
              </Paper>
            </React.Fragment>
          ))}
      </Container>

      {/* Unified Navigation Buttons (Bottom) */}
      {showDetails && allPages.length > 0 && navigationButtons}
    </Box>
  );
}

export default function InvoicePage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ p: 10, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>
            Rana Export - Initializing Invoice...
          </Typography>
        </Box>
      }
    >
      <InvoiceContent />
    </Suspense>
  );
}
