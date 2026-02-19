// script.js – FitHub Lahore | FINAL WORKING VERSION

(function() {
  "use strict";

  // ---------- INFO PANEL ----------
  const panel = document.getElementById("infoPanel");
  const closeBtn = document.getElementById("closePanel");
  const panelIcon = document.getElementById("panelIcon");
  const panelTitle = document.getElementById("panelTitle");
  const panelBody = document.getElementById("panelBody");

  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      panel.classList.remove("show");
    });
  }

  window.showInfo = function(icon, title, message) {
    if (panelIcon) {
      panelIcon.className = "";
      panelIcon.classList.add(...icon.split(" "));
    }
    if (panelTitle) panelTitle.textContent = title;
    if (panelBody) panelBody.textContent = message;
    panel.classList.add("show");

    setTimeout(() => {
      panel.classList.remove("show");
    }, 5000);
  };

  // ---------- MOBILE MENU ----------
  const mobileBtn = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector("nav ul");

  if (mobileBtn && navMenu) {
    function handleMobileMenu() {
      if (window.innerWidth <= 950) {
        navMenu.style.display = "none";
      } else {
        navMenu.style.display = "flex";
        navMenu.style.flexDirection = "row";
        navMenu.style.position = "static";
        navMenu.style.background = "transparent";
        navMenu.style.padding = "0";
      }
    }

    handleMobileMenu();
    window.addEventListener("resize", handleMobileMenu);

    mobileBtn.addEventListener("click", function() {
      if (window.innerWidth <= 950) {
        if (navMenu.style.display === "flex") {
          navMenu.style.display = "none";
        } else {
          navMenu.style.display = "flex";
          navMenu.style.flexDirection = "column";
          navMenu.style.position = "absolute";
          navMenu.style.top = "80px";
          navMenu.style.left = "0";
          navMenu.style.width = "100%";
          navMenu.style.background = "#0b121f";
          navMenu.style.padding = "2rem";
          navMenu.style.zIndex = "99";
        }
      }
    });
  }

  // ---------- SMOOTH SCROLL ----------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });

          if (navMenu && window.innerWidth <= 950) {
            navMenu.style.display = "none";
          }
        }
      }
    });
  });

  // ---------- COPYRIGHT YEAR ----------
  const copyrightPara = document.querySelector(".footer-bottom p");
  if (copyrightPara) {
    const currentYear = new Date().getFullYear();
    copyrightPara.innerHTML = copyrightPara.innerHTML.replace("2026", currentYear);
  }

  // ---------- VIDEO PLAY - FIXED FOR LOCAL VIDEO ----------
  const watchBtn = document.getElementById('watchVideoBtn');
  const video = document.getElementById('gymVideo');
  
  if (watchBtn && video) {
    watchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Scroll to video smoothly
      video.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Show message to click play
      window.showInfo(
        "fas fa-hand-pointer",
        "🎬 Click Play Button",
        "Press the play button on video to start",
      );
      
      // Highlight the video
      video.style.boxShadow = "0 0 0 4px #f3b23a";
      setTimeout(() => {
        video.style.boxShadow = "none";
      }, 2000);
      
      // Optional: Try to play (may be blocked)
      video.play().catch(() => {
        // User must click play manually - this is normal
        console.log("Manual play required");
      });
    });
  }

  // ---------- BMI CALCULATOR WITH EXPLANATION ----------
  (function() {
    const calculateBtn = document.getElementById("calculateBMI");
    const resetBtn = document.getElementById("resetBMI");
    const heightInput = document.getElementById("bmiHeight");
    const weightInput = document.getElementById("bmiWeight");
    const resultDiv = document.getElementById("bmiResult");

    if (!calculateBtn || !resetBtn || !heightInput || !weightInput || !resultDiv) {
      console.log("BMI Calculator: Elements not found");
      return;
    }

    console.log("✅ BMI Calculator Ready");

    // Add animation styles
    if (!document.getElementById("bmi-styles")) {
      const style = document.createElement("style");
      style.id = "bmi-styles";
      style.textContent = `
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-10px)} 75%{transform:translateX(10px)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `;
      document.head.appendChild(style);
    }

    function calculateBMI() {
      const height = parseFloat(heightInput.value);
      const weight = parseFloat(weightInput.value);

      if (!height || !weight || height <= 0 || weight <= 0) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = '<div style="color:#f44336;"><i class="fas fa-exclamation-circle" style="font-size:3rem;"></i><h3>Invalid Input!</h3><p>Please enter valid values</p></div>';

        [heightInput, weightInput].forEach((input) => {
          input.style.borderColor = "#f44336";
          input.style.animation = "shake 0.3s";
          setTimeout(() => {
            input.style.borderColor = "#e0e7f0";
            input.style.animation = "";
          }, 300);
        });
        return;
      }

      // BMI FORMULA: weight(kg) / [height(m)]²
      const bmi = weight / ((height / 100) * (height / 100));
      const roundedBMI = Math.round(bmi * 10) / 10;

      let status, icon, color, message, detailedMessage;

      // BMI CATEGORIES EXPLAINED:
      if (bmi < 18.5) {
        status = "Underweight";
        icon = "fas fa-weight-scale";
        color = "#4caf50";
        message = "Your weight is low. Take nutrition guidance from Hamna!";
        detailedMessage = `Your BMI is ${roundedBMI}. This means you are UNDERWEIGHT. You should gain some weight with proper nutrition.`;
      } 
      else if (bmi < 25) {
        status = "Fit ✅ (Healthy)";
        icon = "fas fa-check-circle";
        color = "#8bc34a";
        message = "Congratulations! You are perfectly fit. Keep it up!";
        detailedMessage = `Your BMI is ${roundedBMI}. This is in the HEALTHY range (18.5-24.9). You have a normal body weight. Maintain it with regular exercise!`;
      } 
      else if (bmi < 30) {
        status = "Overweight";
        icon = "fas fa-exclamation-triangle";
        color = "#f3b23a";
        message = "Your weight is high. Join FitHub and start working out!";
        detailedMessage = `Your BMI is ${roundedBMI}. This means you are OVERWEIGHT (25-29.9). You should start exercising to reach healthy range.`;
      }
      else {
        status = "Obese";
        icon = "fas fa-exclamation-circle";
        color = "#f44336";
        message = "Your weight is very high. Personal training recommended!";
        detailedMessage = `Your BMI is ${roundedBMI}. This means you are OBESE (30+). Please join FitHub for professional guidance.`;
      }

      resultDiv.style.display = "block";
      resultDiv.style.animation = "fadeInUp 0.5s";
      
      // Show result with clear explanation
      resultDiv.innerHTML = `
        <div style="text-align:center;">
          <div style="width:90px;height:90px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;margin:0 auto;">
            <i class="${icon}" style="color:white;font-size:2.8rem;"></i>
          </div>
          <div style="font-size:3rem;font-weight:800;color:${color};">${roundedBMI}</div>
          <div style="font-size:1.8rem;font-weight:700;color:#0a192c;margin:1rem 0;">${status}</div>
          <div style="background:white;padding:1.5rem;border-radius:20px;text-align:left;margin:1rem 0;">
            <p style="margin-bottom:0.5rem;"><strong>📌 What this means:</strong></p>
            <p>${detailedMessage}</p>
            <hr style="margin:1rem 0;">
            <p><strong>📊 BMI Categories:</strong></p>
            <p>• Below 18.5 = Underweight</p>
            <p>• 18.5 - 24.9 = Healthy ✅</p>
            <p>• 25.0 - 29.9 = Overweight</p>
            <p>• 30.0 and above = Obese</p>
          </div>
          <div style="margin-top:1rem;color:#f3b23a;font-weight:600;">
            <i class="fas fa-phone-alt"></i> 0316 4393246
          </div>
        </div>
      `;
    }

    function resetForm() {
      heightInput.value = "";
      weightInput.value = "";
      resultDiv.style.display = "none";
    }

    calculateBtn.addEventListener("click", function(e) {
      e.preventDefault();
      calculateBMI();
    });

    resetBtn.addEventListener("click", function(e) {
      e.preventDefault();
      resetForm();
    });

    [heightInput, weightInput].forEach((input) => {
      input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          calculateBMI();
        }
      });
    });
  })();

  // ---------- WELCOME MESSAGE ----------
  window.addEventListener("load", function() {
    setTimeout(() => {
      window.showInfo(
        "fas fa-map-marker-alt",
        "📍 FitHub Lahore",
        "Hamna Yahya • 0316 4393246",
      );
    }, 800);
  });

  console.log("✅ FitHub Scripts Loaded");
})();
