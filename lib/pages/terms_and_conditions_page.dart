import 'package:flutter/material.dart';

class TermsAndConditionsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Terms and Conditions'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Terms and Conditions',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 20),
              Text(
                'Updated September 18, 2024',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'Welcome to Sway. These Terms and Conditions govern your use of our website and services. By accessing or using our site, you agree to comply with these Terms. If you do not agree, you must stop using the website immediately.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Services',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'Sway offers wellness services, including facials, massages, and remedy technologies like saunas and cold plunges. These services are subject to availability, and Sway reserves the right to modify or discontinue any service without notice.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'User Responsibilities',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'By using our site, you agree to:\n- Provide accurate information when making a purchase or registration.\n- Not use the site for unlawful purposes.\n- Not interfere with the operation of the site or access to other users.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Orders and Payments',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'All orders placed through our website are subject to acceptance by Sway. We reserve the right to cancel any order for any reason, including product or service availability or errors in pricing. Prices are displayed in U.S. dollars and do not include taxes, shipping, or other fees unless stated. You are responsible for payment of any applicable taxes.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Memberships',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'If Sway offers memberships, such memberships are subject to the terms outlined at the time of registration, including cancellation policies, fees, and benefits. Sway reserves the right to modify or cancel memberships at its discretion.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Cancellations and Refunds',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'You may cancel services booked through our website according to the cancellation policy provided at the time of booking. Refunds, if applicable, will be processed within [X] business days.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Intellectual Property',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'All content, including text, graphics, logos, and images on the Sway website, is the property of Sway or its content suppliers and is protected by copyright laws. You may not use or reproduce any content without express permission.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Links to Third-Party Sites',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'Our website may contain links to third-party websites. These links are provided for your convenience, and Sway is not responsible for the content or privacy practices of these sites.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Disclaimer of Warranties',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'All services and products provided by Sway are offered "as is" without warranties of any kind, either express or implied. We do not warrant that the site will be error-free, secure, or continuously available.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Limitation of Liability',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'Sway and its affiliates are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or our services, including but not limited to lost profits or data.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Indemnification',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'You agree to indemnify and hold Sway harmless from any claims, liabilities, damages, or expenses arising from your use of the site or violation of these Terms and Conditions.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Governing Law',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'These Terms and Conditions are governed by and construed in accordance with the laws of Denver, CO, USA, without regard to conflict of law principles. Any legal action related to these Terms shall be filed in the courts of Denver, CO, USA.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Changes to These Terms',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'Sway reserves the right to update or modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Continued use of the website constitutes your acceptance of the revised Terms.',
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              Text(
                'Contact Us',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'If you have any questions about these Terms and Conditions, please contact us.',
                style: TextStyle(fontSize: 16),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
