// import logo from "../assets/logo.png";
import playstore from "../assets/images/playstore.png"
import appstore from "../assets/images/appstore.png"

import "./global.css";

function Footer() {
  return (
    <div>
      <footer>
        <div class="waves">
          <div class="wave" id="wave1"></div>
          <div class="wave" id="wave2"></div>
          <div class="wave" id="wave3"></div>
          <div class="wave" id="wave4"></div>
        </div>
        <div>
          <p>We will be soon live on</p>
        </div>
        <div>
          <img src={playstore} alt="" />
          <img src={appstore} alt="" />
        </div>
      </footer>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
}
export default Footer;