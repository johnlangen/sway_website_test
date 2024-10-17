import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:cloud_firestore/cloud_firestore.dart'; // Import Firestore

class FooterMobile extends StatefulWidget {
  @override
  _FooterMobileState createState() => _FooterMobileState();
}

class _FooterMobileState extends State<FooterMobile> {
  // Define the Instagram URL
  final Uri instagramUrl = Uri.parse('https://www.instagram.com/swaywellnessclub/');
  final Uri tikTokUrl = Uri.parse('https://www.tiktok.com/@swaywellnessclub');

  // Controller for email input
  final TextEditingController _emailController = TextEditingController();
  bool _submitted = false; // Track submission state
  bool _isHoveringArrow = false; // For arrow button hover state

  // Function to handle email submission
  Future<void> _submitEmail() async {
    String email = _emailController.text.trim();

    if (email.isNotEmpty) {
      try {
        await FirebaseFirestore.instance.collection('newsletterEmails').add({
          'email': email,
          'timestamp': FieldValue.serverTimestamp(),
        });

        // Clear email field and show thank you message
        _emailController.clear();
        setState(() {
          _submitted = true;
        });
      } catch (e) {
        print('Error saving email: $e');
        // Optionally, show an error message to the user
      }
    } else {
      // Optionally, show a message to enter an email
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, // Full width of the screen
      decoration: BoxDecoration(color: Color(0xFF113D33)),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20), // Adjust padding for mobile
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Mobile layout structure
            _buildLogoAndNewsletter(),
            SizedBox(height: 20),
            _buildLinksSection(),
            SizedBox(height: 20),
            _buildContactSection(),
            SizedBox(height: 40),
            _buildFooterBottom(),
          ],
        ),
      ),
    );
  }

  Widget _buildLogoAndNewsletter() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Image.asset(
          'assets/swaylogo.png',
          width: 75, // Adjust the size as needed
          height: 25.53,
        ),
        SizedBox(height: 20), // Adjust spacing
        Text(
          _submitted
              ? 'Thanks for joining the club!' // Show thank you message after submission
              : 'Subscribe to our newsletter',
          style: TextStyle(
            color: Color(0xFFF6F7F6),
            fontSize: 14,
            fontFamily: 'Helvetica',
            fontWeight: FontWeight.w400,
            height: 1.5, // Adjusted for better readability
          ),
        ),
        if (!_submitted) ...[
          SizedBox(height: 10), // Space between text and input field
          Row(
            children: [
              Expanded(
                child: Container(
                  child: TextField(
                    controller: _emailController, // Connect TextField to controller
                    style: TextStyle(color: Color(0xFFF6F7F6)),
                    decoration: InputDecoration(
                      hintText: 'Enter your email',
                      hintStyle: TextStyle(color: Color(0xFFF6F7F6).withOpacity(0.7)),
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Color(0xFFF6F7F6), width: 1),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: Color(0xFFF6F7F6), width: 1),
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(width: 10), // Space between input field and button
              MouseRegion(
                cursor: SystemMouseCursors.click, // Change cursor to pointer on hover
                onEnter: (_) => setState(() => _isHoveringArrow = true),
                onExit: (_) => setState(() => _isHoveringArrow = false),
                child: GestureDetector(
                  onTap: _submitEmail, // Submission logic
                  child: AnimatedContainer(
                    duration: Duration(milliseconds: 200),
                    width: 24,
                    height: 24,
                    decoration: ShapeDecoration(
                      shape: OvalBorder(
                        side: BorderSide(width: 1, color: Color(0xFFF6F7F6)),
                      ),
                      color: _isHoveringArrow ? Colors.white.withOpacity(0.1) : Colors.transparent,
                    ),
                    child: Center(
                      child: Icon(
                        Icons.arrow_forward,
                        size: 16,
                        color: Color(0xFFF6F7F6),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ],
    );
  }

  Widget _buildLinksSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildLinksColumn(['Memberships', 'Treatments', 'Locations']),
        SizedBox(height: 20), // Add space before Instagram
        GestureDetector(
          onTap: () async {
            if (await canLaunchUrl(instagramUrl)) {
              await launchUrl(instagramUrl);
            } else {
              throw 'Could not launch $instagramUrl';
            }
          },
          child: SizedBox(
            width: 109,
            child: Text(
              'Instagram',
              style: TextStyle(
                color: Color(0xFFF6F7F6),
                fontSize: 14,
                fontFamily: 'Helvetica',
                fontWeight: FontWeight.w400,
                height: 1.5,
              ),
            ),
          ),
        ),
        SizedBox(height: 10),
        GestureDetector(
          onTap: () async {
            final Uri tikTokUrl = Uri.parse('https://www.tiktok.com/@swaywellnessclub');
            if (await canLaunchUrl(tikTokUrl)) {
              await launchUrl(tikTokUrl);
            } else {
              throw 'Could not launch $tikTokUrl';
            }
          },
          child: SizedBox(
            width: 109,
            child: Text(
              'Tiktok',
              style: TextStyle(
                color: Color(0xFFF6F7F6),
                fontSize: 14,
                fontFamily: 'Helvetica',
                fontWeight: FontWeight.w400,
                height: 1.5,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildLinksColumn(List<String> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: items.map((item) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: GestureDetector(
            onTap: () {
              // Navigate to respective pages
              switch (item) {
                case 'Memberships':
                  Navigator.pushNamed(context, '/membership');
                  break;
                case 'Treatments':
                  Navigator.pushNamed(context, '/treatments');
                  break;
                case 'Locations':
                  // Placeholder for location link, if needed
                  break;
              }
            },
            child: SizedBox(
              width: 109,
              child: Text(
                item,
                style: TextStyle(
                  color: Color(0xFFF6F7F6),
                  fontSize: 14,
                  fontFamily: 'Helvetica',
                  fontWeight: FontWeight.w400,
                  height: 1.5,
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildContactSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 200,
          child: Text(
            '1428 Larimer St.\nDenver, CO. 80202',
            style: TextStyle(
              color: Color(0xFFF6F7F6),
              fontSize: 14,
              fontFamily: 'Helvetica',
              fontWeight: FontWeight.w400,
              height: 1.5, // Adjusted spacing between lines
            ),
          ),
        ),
        SizedBox(height: 10),
        SizedBox(
          width: 200,
          child: Text(
            'Phone: +1 720-588-8667',
            style: TextStyle(
              color: Color(0xFFF6F7F6),
              fontSize: 14,
              fontFamily: 'Helvetica',
              fontWeight: FontWeight.w400,
              height: 1.5,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFooterBottom() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Terms and Conditions with navigation
        Align(
          alignment: Alignment.centerLeft, // Align text to the left
          child: GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/terms-and-conditions');
            },
            child: Text(
              'Terms and Conditions',
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 10,
                fontFamily: 'Helvetica',
                fontWeight: FontWeight.w400,
                height: 1.5,
                decoration: TextDecoration.underline, // Add underline for clickable appearance
              ),
            ),
          ),
        ),

        SizedBox(height: 10),

        // Privacy Policy with navigation
        Align(
          alignment: Alignment.centerLeft, // Align text to the left
          child: GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/privacy-policy');
            },
            child: Text(
              'Privacy Policy',
              textAlign: TextAlign.left,
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 10,
                fontFamily: 'Helvetica',
                fontWeight: FontWeight.w400,
                height: 1.5,
                decoration: TextDecoration.underline, // Add underline for clickable appearance
              ),
            ),
          ),
        ),
      ],
    );
  }
}
