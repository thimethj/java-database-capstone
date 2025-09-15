// app/src/main/resources/static/js/components/footer.js

function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return; // no container found
  
    footer.innerHTML = `
      <footer class="footer">
        <div class="footer-logo">
          <img src="../assets/img/logo.png" alt="Clinic Logo" style="height:40px;" />
          <p>© ${new Date().getFullYear()} Smart Clinic. All rights reserved.</p>
        </div>
  
        <div class="footer-columns" style="display:flex; flex-wrap:wrap; gap:2rem; margin-top:1rem;">
          <!-- Company -->
          <div class="footer-column">
            <h4>Company</h4>
            <a href="/pages/about.html">About</a><br />
            <a href="/pages/careers.html">Careers</a><br />
            <a href="/pages/press.html">Press</a>
          </div>
  
          <!-- Support -->
          <div class="footer-column">
            <h4>Support</h4>
            <a href="/pages/account.html">Account</a><br />
            <a href="/pages/help.html">Help Center</a><br />
            <a href="/pages/contact.html">Contact</a>
          </div>
  
          <!-- Legals -->
          <div class="footer-column">
            <h4>Legals</h4>
            <a href="/pages/terms.html">Terms</a><br />
            <a href="/pages/privacy.html">Privacy Policy</a><br />
            <a href="/pages/licensing.html">Licensing</a>
          </div>
        </div>
      </footer>
    `;
  }
  
  // Call immediately so the footer renders on page load
  renderFooter();
  