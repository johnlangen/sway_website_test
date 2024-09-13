import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart';
import '../widgets/footer.dart';
import '../widgets/footer_mobile.dart';

class PrivacyPolicyPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    bool isMobile = MediaQuery.of(context).size.width < 1000;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Navbar positioned above the content
            NavBarGreen(), // Green Navbar at the top

            // Privacy Policy section with light cream background and green text
            Container(
              color: Color(0xFFF7F4E9), // Light cream color for the background
              padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20), 
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Privacy Policy',
                    style: TextStyle(
                      color: Color(0xFF113D33), // Green color for title
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          'Sway is committed to respecting your privacy.',
                          style: TextStyle(
                            color: Color(0xFF113D33), // Green color for text
                            fontSize: 16,
                          ),
                        ),
                      ),
                      Text(
                        'Updated September 18, 2024',
                        style: TextStyle(
                          color: Color(0xFF113D33),
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 20),
                  Text(
                    'Your privacy is important to us. This Privacy Policy explains how Sway collects, uses, and protects your personal information. By using our website, you agree to the terms of this policy.',
                    style: TextStyle(
                      fontSize: 16,
                      color: Color(0xFF113D33),
                    ),
                  ),
                  SizedBox(height: 20),
                  // Additional sections
                  _buildSectionTitle('The Information We Collect'),
                  _buildSectionContent(
                    'We are the sole owners of the information collected on this site. We collect personal information that you voluntarily provide to us through forms, emails, or other direct contact. We may collect:\n\n'
                    'Name\nAddress\nEmail address\nPhone number\nCredit/debit card information\nOther information necessary to fulfill your request (e.g., shipping address)\n\n'
                    'Information Collected from Others: If you order a product or service for someone else, we collect the personal information necessary to complete the order for that individual, including their name and address.'
                  ),
                  _buildSectionTitle('How We Use Your Information'),
                  _buildSectionContent(
                    'We use your information to:\n\n'
                    '• Complete orders and transactions\n'
                    '• Respond to inquiries\n'
                    '• Provide services requested by you\n'
                    '• Notify you of new products, services, or promotions (unless you opt-out)\n\n'
                    'We do not sell or rent your personal information to third parties. We may share your data with trusted third parties who assist in fulfilling your requests, such as shipping companies or payment processors.'
                  ),
                  _buildSectionTitle('Your Rights (GDPR/CCPA Compliance)'),
                  _buildSectionContent(
                    'You have the right to:\n\n'
                    '• Access your personal information\n'
                    '• Correct or update any information we have\n'
                    '• Request deletion of your data\n'
                    '• Object to or restrict certain types of data processing\n\n'
                    'To exercise these rights, contact us.'
                  ),
                  // Add remaining sections similarly
                ],
              ),
            ),

            // Footer section for the page
            isMobile ? FooterMobile() : Footer(),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(top: 20, bottom: 10),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Color(0xFF113D33), // Green color for section titles
        ),
      ),
    );
  }

  Widget _buildSectionContent(String content) {
    return Text(
      content,
      style: TextStyle(
        fontSize: 16,
        color: Color(0xFF113D33), // Green color for text
        height: 1.5, // Increase line height for readability
      ),
    );
  }
}
