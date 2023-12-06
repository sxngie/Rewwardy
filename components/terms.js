import React from "react";
import styles from "@/styles/register.module.css"; // Create and import your modal styles

const TermsModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Terms and Conditions</h4>
        </div>
        <div className={styles.modalBody}>
          {/* Insert your terms and conditions text here */}
          <p>Last Updated: November, 2023</p>
          <ol style={{padding: '7%'}}>
<p style={{fontWeight: 'bold'}}>Welcome to Rewwardy!<br></br> These Terms and Conditions govern your use of Rewwardy and the services we offer. Rewwardy is a platform designed for local businesses to implement a reward system for their customers, offering discounts and freebies on future purchases.</p>
<br></br>
<li><h4>By creating an account on Rewwardy, you agree to:</h4>
    <ul style={{padding: '1% 5% 2% 5%'}}>
        <li>Provide accurate and current information about yourself.</li>
        <li>Maintain the security of your account and promptly notify us of any unauthorized use.</li>
        <li>Accept all risks of unauthorized access to your account.</li></ul></li>
        <br></br>
<li><h4>Intellectual Property Rights</h4>
    <p style={{padding: '1% 5% 2% 5%'}}>All content on Rewwardy, including text, graphics, logos, and software, is the property of Rewwardy or its licensors and is protected by copyright and intellectual property laws.</p></li>
<li><h4>User Responsibilities</h4>
    <p>Users of Rewwardy agree to:</p>
    <ul style={{padding: '1% 5% 2% 5%'}}>
        <li>Use the service in compliance with all applicable laws.</li>
        <li>Not engage in any behavior that is harmful, offensive, or disruptive to the service or other users.</li>
        <li>Respect the rights and privacy of local businesses and other users.</li>
    </ul>
</li>
<br></br>
    <li><h4>Privacy Policy</h4>
        Your privacy is important to us. Please review our Privacy Policy, which also governs your use of Rewwardy, to understand our practices.</li>
        <br></br>
    <li><h4>Limitation of Liability</h4>
        Rewwardy will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the service.</li>
        <br></br>
    <li><h4>Amendment Clause</h4>
        We reserve the right to modify these Terms and Conditions at any time. You are advised to review this page periodically for any changes.</li>
        <br></br>
    <li><h4>Governing Law</h4>
        These Terms and Conditions shall be governed and construed in accordance with the laws of Puerto Rico, without regard to its conflict of law provisions.</li>
        <br></br>
    <li><h4>Termination of Use</h4>
        We may terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever, including, without limitation, if you breach the Terms and Conditions.</li>
        <br></br>
    <li><h4>Contact Information</h4>
        For any questions about these Terms and Conditions, please contact us at support@rewwardy.com.</li>
        <br></br>
</ol>

    <div className={styles.modalHeader}>
        <h4 className={styles.modalTitle}>Privacy Policy</h4>
    </div>
        <p>Last Updated: November, 2023</p>
        <ol style={{padding: '7%'}}>
        <p style={{fontWeight: 'bold'}}>Rewwardys Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this policy carefully to understand our practices regarding your information.</p>
            <br></br>
            <li><h4>Information Collection</h4></li>
            <p>We may collect the following types of information:</p>
            <ul style={{padding: '2% 5% 2% 5%'}}>
                <li>Personal Identification Information: Name, email address, phone number, etc.</li>
                <li>Transaction Information: Details of transactions and purchases made through the app.</li>
                <li>Usage and Device Information: Information about how you use the app and your device preferences.</li>
            </ul>
            <br></br>
    <li><h4>Use of Information The information we collect may be used to:</h4></li>
    <ul style={{padding: '1% 5% 2% 5%'}}>
        <li>Provide, maintain, and improve our services.</li>
        <li>Communicate with you, including customer service and updates.</li>
        <li>Process transactions and send related information.</li>
        <li>Monitor and analyze trends, usage, and activities.</li>
    </ul>

<br></br>
    <li><h4>Sharing of Information We may share information as follows:</h4></li>
    <ul style={{padding: '1% 5% 2% 5%'}}>
        <li>With local businesses for facilitating the reward system.</li>
        <li>For legal reasons or in the event of a dispute.</li>
        <li>With your consent or at your direction.</li>
    </ul>
<br></br>
    <li><h4>Data Security</h4></li>
    <p>We implement a variety of security measures to maintain the safety of your personal information but remember that no method of transmission over the Internet is 100% secure.
</p>
<br></br>
    <li><h4>Your Rights</h4></li> 
    <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, update, or delete your information.</p>
<br></br>
    <li><h4>Childrens Privacy</h4></li>
    <p>Our service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under that age.
</p><br></br>
        <li><h4>Changes to This Privacy Policy</h4></li> 
        <p>We reserve the right to modify this policy at any time. Changes and clarifications will take effect immediately upon their posting on the website.
</p><br></br>
        <p>If you have any questions about this Privacy Policy, please contact us at support@rewwardy.com.
</p>    </ol>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.button} style={{backgroundColor: '#9B2C6B',
    color: '#FFFFFF'}}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
