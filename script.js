/* =====================================
   SMART UTILITY MANAGEMENT PLATFORM
   Frontend JavaScript
===================================== */


/* =========================
   ELEMENTS
========================= */

const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");

const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

const navItems = document.querySelectorAll(".nav-item");

const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

const complaintModal = document.getElementById("complaintModal");
const paymentModal = document.getElementById("paymentModal");

const complaintForm = document.getElementById("complaintForm");
const payBtn = document.getElementById("payBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================
   PAGE INFORMATION
========================= */

const pageInfo = {

    dashboard: {
        title: "Dashboard",
        subtitle: "Welcome back to your utility dashboard."
    },

    bills: {
        title: "My Bills",
        subtitle: "View and manage your electricity bills."
    },

    analytics: {
        title: "Usage Analytics",
        subtitle: "Understand your electricity consumption."
    },

    complaints: {
        title: "Complaints",
        subtitle: "Report and track electricity-related issues."
    },

    outage: {
        title: "Outage Map",
        subtitle: "Check electricity service status in your area."
    },

    notifications: {
        title: "Notifications",
        subtitle: "Stay updated about your utility services."
    },

    profile: {
        title: "My Profile",
        subtitle: "Manage your account information."
    }

};


/* =========================
   LOGIN
========================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {

        loginScreen.classList.add("hidden");
        app.classList.remove("hidden");

        showToast("Login successful!");

    }

});


/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener("click", function() {

    app.classList.add("hidden");
    loginScreen.classList.remove("hidden");

    document.getElementById("password").value = "";

    showToast("You have been logged out.");

});


/* =========================
   NAVIGATION
========================= */

navItems.forEach(function(item) {

    item.addEventListener("click", function() {

        const page = item.dataset.page;

        if (!page) {
            return;
        }

        showPage(page);

    });

});


function showPage(pageName) {

    pages.forEach(function(page) {

        page.classList.remove("active-page");

    });


    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    navItems.forEach(function(item) {

        item.classList.remove("active");

        if (item.dataset.page === pageName) {
            item.classList.add("active");
        }

    });


    if (pageInfo[pageName]) {

        pageTitle.textContent =
            pageInfo[pageName].title;

        pageSubtitle.textContent =
            pageInfo[pageName].subtitle;

    }


    // Close mobile sidebar

    sidebar.classList.remove("open");

}


/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener("click", function() {

    sidebar.classList.toggle("open");

});


/* =========================
   COMPLAINT MODAL
========================= */

function openComplaintModal() {

    complaintModal.classList.add("show");

}


function closeComplaintModal() {

    complaintModal.classList.remove("show");

}


complaintForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const category =
        document.getElementById("complaintCategory").value;

    const description =
        document.getElementById("complaintDescription").value;


    if (!category || !description) {

        showToast("Please complete all required fields.");

        return;

    }


    closeComplaintModal();

    complaintForm.reset();

    showToast(
        "Complaint submitted successfully! ID: CMP12347"
    );

});


/* =========================
   PAYMENT
========================= */

function openPayment() {

    paymentModal.classList.add("show");

}


function closePayment() {

    paymentModal.classList.remove("show");

}


payBtn.addEventListener("click", function() {

    const method =
        document.getElementById("paymentMethod").value;


    closePayment();


    showToast(
        "Payment successful using " + method + "!"
    );


    // Change unpaid status visually

    const unpaidBadges =
        document.querySelectorAll(".unpaid");

    unpaidBadges.forEach(function(badge) {

        badge.textContent = "Paid";

        badge.classList.remove("unpaid");
        badge.classList.add("paid");

    });

});


/* =========================
   NOTIFICATIONS
========================= */

const markReadBtn =
    document.getElementById("markReadBtn");


markReadBtn.addEventListener("click", function() {

    const unread =
        document.querySelectorAll(".notification-card.unread");


    unread.forEach(function(notification) {

        notification.classList.remove("unread");

    });


    document.querySelector(".notification-count").textContent = "0";

    showToast("All notifications marked as read.");

});


/* =========================
   PERIOD SELECT
========================= */

const periodSelect =
    document.getElementById("periodSelect");


periodSelect.addEventListener("change", function() {

    showToast(
        "Analytics updated for " +
        periodSelect.value
    );

});


/* =========================
   TOAST
========================= */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================
   CLOSE MODALS WHEN CLICKING
   OUTSIDE
========================= */

window.addEventListener("click", function(event) {

    if (event.target === complaintModal) {

        closeComplaintModal();

    }

    if (event.target === paymentModal) {

        closePayment();

    }

});


/* =========================
   INITIAL STATE
========================= */

showPage("dashboard");