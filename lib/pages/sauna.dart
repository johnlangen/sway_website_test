import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart'; // Green navbar
import '../widgets/footer.dart'; // Footer
import '../widgets/footer_mobile.dart'; // Mobile footer

class SaunaPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    bool isMobile = MediaQuery.of(context).size.width < 1000;

    return Scaffold(
      backgroundColor: Color(0xFFF7F4E9), // Creamish background
      body: SingleChildScrollView(
        child: Column(
          children: [
            Stack(
              children: [
                // Green Navbar logic for mobile and desktop
                Positioned(
                  top: isMobile ? 20 : 40,
                  left: 0,
                  right: 0,
                  child: NavBarGreen(), // Green Navbar at the top
                ),
                // Mobile and Desktop layouts
                if (isMobile)
                  _buildMobileLayout(context)
                else
                  _buildDesktopLayout(context),
              ],
            ),
            SizedBox(height: 100), // Space before the footer
            if (isMobile) FooterMobile() else Footer(), // Footer section
          ],
        ),
      ),
    );
  }

  // ------------------ Desktop Layout ------------------
  Widget _buildDesktopLayout(BuildContext context) {
    return Container(
      width: double.infinity, // Ensure the background goes edge to edge
      margin: EdgeInsets.only(top: 160), // Space below the navbar
      padding: EdgeInsets.symmetric(horizontal: 100.0), // Increased padding for more room
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image to the left
          Container(
            width: 599,
            height: 664,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/homepage_photo2.png'), // Local image reference
                fit: BoxFit.fill,
              ),
            ),
          ),
          SizedBox(width: 100), // More space between image and text
          // Text on the right
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: 192,
                  child: Text(
                    'RECOMMENDED 30 MIN',
                    style: TextStyle(
                      color: Color(0xFF4A776D),
                      fontSize: 15,
                      fontFamily: 'Helvetica',
                      fontWeight: FontWeight.w400,
                      height: 1.5, // Adjust height
                    ),
                  ),
                ),
                SizedBox(height: 10),
                SizedBox(
                  width: 485,
                  child: Text(
                    'Infrared Sauna',
                    style: TextStyle(
                      color: Color(0xFF113D33),
                      fontSize: 50,
                      fontFamily: 'Vance',
                      fontWeight: FontWeight.w300,
                      height: 1.2,
                    ),
                  ),
                ),
                SizedBox(height: 20),
                Text(
                  '4x Visits a Month\nDrop-In \$139 I Member \$99',
                  style: TextStyle(
                    color: Color(0xFF4A776D),
                    fontSize: 20,
                    fontFamily: 'Vance',
                    fontWeight: FontWeight.w400,
                    height: 1.5,
                  ),
                ),
                SizedBox(height: 20),
                SizedBox(
                  width: 624,
                  child: Text(
                    'Science-backed Treatment. Boost recovery. Burn calories.\nBuild immunity. Improve sleep. Reduce stress. Increase energy.\nImprove focus. Promote balance.',
                    style: TextStyle(
                      color: Color(0xFF4A776D),
                      fontSize: 25,
                      fontFamily: 'Vance',
                      fontWeight: FontWeight.w300,
                      height: 1.5,
                    ),
                  ),
                ),
                SizedBox(height: 20),
                SizedBox(
                  width: 213,
                  child: Text(
                    'Recommended for',
                    style: TextStyle(
                      color: Color(0xFF4A776D),
                      fontSize: 25,
                      fontFamily: 'Vance',
                      fontWeight: FontWeight.w400,
                      height: 1.5,
                    ),
                  ),
                ),
                SizedBox(height: 10),
                // Cross bullet points for recommended
                SizedBox(
                  width: 388,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildBulletPoint('Reducing Stress and Anxiety'),
                      _buildBulletPoint('Improving Skin Health'),
                      _buildBulletPoint('Anyone that suffers from Arthritis'),
                      _buildBulletPoint('Those needing detoxification'),
                      _buildBulletPoint('Muscle pain and joint stiffness'),
                    ],
                  ),
                ),
                SizedBox(height: 30),
                // Button Text
                GestureDetector(
                  onTap: () {
                    // Add button action here
                  },
                  child: Container(
                    padding: EdgeInsets.symmetric(vertical: 15, horizontal: 20),
                    decoration: BoxDecoration(
                      color: Color(0xFF4A776D),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Text(
                      'Schedule Your Wellness',
                      style: TextStyle(
                        color: Color(0xFFF6F7F6),
                        fontSize: 20,
                        fontFamily: 'Vance',
                        fontWeight: FontWeight.w400,
                        height: 1.2,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ------------------ Mobile Layout ------------------
  Widget _buildMobileLayout(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(top: 120), // Space below the navbar
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, // Align text left
        children: [
          // Image on top for mobile
          Container(
            width: 299,
            height: 332, // Reduced size for mobile
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/homepage_photo2.png'),
                fit: BoxFit.fill,
              ),
            ),
          ),
          SizedBox(height: 20),
          // Text elements stacked below, aligned left
          Text(
            'RECOMMENDED 30 MIN',
            style: TextStyle(
              color: Color(0xFF4A776D),
              fontSize: 12, // Smaller text size for mobile
              fontFamily: 'Helvetica',
              fontWeight: FontWeight.w400,
              height: 1.2,
            ),
          ),
          SizedBox(height: 10),
          Text(
            'Infrared Sauna',
            style: TextStyle(
              color: Color(0xFF113D33),
              fontSize: 30, // Smaller size for mobile
              fontFamily: 'Vance',
              fontWeight: FontWeight.w300,
              height: 1.2,
            ),
          ),
          SizedBox(height: 20),
          Text(
            '4x Visits a Month\nDrop-In \$139 I Member \$99',
            style: TextStyle(
              color: Color(0xFF4A776D),
              fontSize: 16, // Smaller for mobile
              fontFamily: 'Vance',
              fontWeight: FontWeight.w400,
              height: 1.2,
            ),
          ),
          SizedBox(height: 20),
          Text(
            'Science-backed Treatment. Boost recovery. Burn calories.\nBuild immunity. Improve sleep. Reduce stress. Increase energy.\nImprove focus. Promote balance.',
            style: TextStyle(
              color: Color(0xFF4A776D),
              fontSize: 16, // Smaller text for mobile
              fontFamily: 'Vance',
              fontWeight: FontWeight.w300,
              height: 1.5,
            ),
          ),
          SizedBox(height: 20),
          Text(
            'Recommended for',
            style: TextStyle(
              color: Color(0xFF4A776D),
              fontSize: 18, // Smaller size for mobile
              fontFamily: 'Vance',
              fontWeight: FontWeight.w400,
              height: 1.5,
            ),
          ),
          SizedBox(height: 10),
          // Cross bullet points for mobile
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildBulletPoint('Reducing Stress and Anxiety'),
              _buildBulletPoint('Improving Skin Health'),
              _buildBulletPoint('Anyone that suffers from Arthritis'),
              _buildBulletPoint('Those needing detoxification'),
              _buildBulletPoint('Muscle pain and joint stiffness'),
            ],
          ),
          SizedBox(height: 30),
          // Button Text
          GestureDetector(
            onTap: () {
              // Add button action here
            },
            child: Container(
              padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
              decoration: BoxDecoration(
                color: Color(0xFF4A776D),
                borderRadius: BorderRadius.circular(50),
              ),
              child: Text(
                'Schedule Your Wellness',
                style: TextStyle(
                  color: Color(0xFFF6F7F6),
                  fontSize: 18, // Smaller button text for mobile
                  fontFamily: 'Vance',
                  fontWeight: FontWeight.w400,
                  height: 1.2,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // Method to build bullet points
  Widget _buildBulletPoint(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '✕', // Cross bullet point
            style: TextStyle(
              color: Color(0xFF4A776D),
              fontSize: 18, // Adjust size of the bullet point
              fontFamily: 'Vance',
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 18,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w300,
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
