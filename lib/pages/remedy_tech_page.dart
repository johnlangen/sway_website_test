import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart'; // Correct green navbar import
import '../widgets/footer.dart'; // Add the correct import for Footer
import '../widgets/footer_mobile.dart'; // Add the correct import for FooterMobile

class RemedyTechPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    bool isMobile = MediaQuery.of(context).size.width < 1000;

    return Scaffold(
      backgroundColor: Color(0xFFF7F4E9), // Creamish background color
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
                // Mobile and Desktop layouts are completely separated
                if (isMobile)
                  _buildMobileLayout(context)
                else
                  _buildDesktopLayout(context),
              ],
            ),
            SizedBox(height: 100), // Space before the card section
            if (isMobile) _buildMobileCardSection(context) else _buildDesktopCardSection(context),
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
      width: double.infinity, // Ensure the green background goes edge to edge
      margin: EdgeInsets.only(top: 160), // Adjusted space below the navbar
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        children: [
          SizedBox(height: 50), // Space between nav and title
          SizedBox(
            width: 351,
            child: Text(
              'REMEDY ROOM',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF113D33),
                fontSize: 50,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.2, // Fixed height for spacing
              ),
            ),
          ),
          SizedBox(height: 30),
          SizedBox(
            width: 625,
            child: Text(
              'Welcome to The Remedy Room, a space to restore your body and refresh your mind. Experience ultimate recovery with our remedy technologies, made to enhance your overall physical well-being and elevate your mental state. It\'s time for you to level up!',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 25,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.5, // Adjusted height for better spacing
              ),
            ),
          ),
          SizedBox(height: 20),
          SizedBox(
            width: 239,
            child: Text(
              '4x Visits a Month\nDrop-In \$139 I Member \$99',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 20,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.5, // Adjusted height for better spacing
              ),
            ),
          ),
          SizedBox(height: 100),
        ],
      ),
    );
  }

  // ------------------ Mobile Layout ------------------
  Widget _buildMobileLayout(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(top: 120), // Adjusted space below the navbar
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: 50), // Space between nav and title
          SizedBox(
            width: 351,
            child: Text(
              'REMEDY ROOM',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF113D33),
                fontSize: 40,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.2, // Adjusted height for spacing
              ),
            ),
          ),
          SizedBox(height: 30),
          SizedBox(
            width: 625,
            child: Text(
              'Welcome to The Remedy Room, a space to restore your body and refresh your mind. Experience ultimate recovery with our remedy technologies, made to enhance your overall physical well-being and elevate your mental state. It\'s time for you to level up!',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 20,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.5, // Adjusted height for spacing
              ),
            ),
          ),
          SizedBox(height: 20),
          SizedBox(
            width: 239,
            child: Text(
              '4x Visits a Month\nDrop-In \$139 I Member \$99',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 20,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.5,
              ),
            ),
          ),
          SizedBox(height: 100),
        ],
      ),
    );
  }

  // ------------------ Desktop Card Section ------------------
  Widget _buildDesktopCardSection(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Color(0xFFF7F4E9), // Cream background
      padding: const EdgeInsets.symmetric(vertical: 50.0, horizontal: 20.0),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Flexible(
                child: _buildCard(
                  context,
                  false,
                  'assets/infrared_sauna.png',
                  'RECOMMENDED 30 MIN',
                  'Infrared Sauna',
                  'Science-backed treatment. Boost recovery. Burn calories. Build immunity. Improve sleep. Reduce stress. Increase energy. Improve focus. Promote balance.',
                ),
              ),
              SizedBox(width: 20),
              Flexible(
                child: _buildCard(
                  context,
                  false,
                  'assets/cold_plunge.png',
                  'RECOMMENDED 30 MIN',
                  'Cold Plunge',
                  'Life-changing benefits. Cold water therapy has been shown to be effective with better sleep, elevated energy, pain and stress relief, a better mood, performance and recovery, and immune support.',
                ),
              ),
            ],
          ),
          SizedBox(height: 50),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Flexible(
                child: _buildCard(
                  context,
                  false,
                  'assets/compression_therapy.png',
                  'RECOMMENDED 30 MIN',
                  'Compression Therapy',
                  'Increases circulation and helps you maintain your full range of motion. Proven to help with lymphatic drainage, and decrease pain and soreness.',
                ),
              ),
              SizedBox(width: 20),
              Flexible(
                child: _buildCard(
                  context,
                  false,
                  'assets/led_light_therapy.png',
                  'RECOMMENDED 30 MIN',
                  'LED Light Therapy',
                  'LightStim MultiWave® Patented Technology emits multiple wavelengths of light. ProPanel utilizes 1,400 medical-grade LEDs optimized for anti-aging, acne, or regeneration.',
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ------------------ Mobile Card Section ------------------
  Widget _buildMobileCardSection(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Color(0xFFF7F4E9), // Cream background
      height: 500, // Height of the card section
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          SizedBox(width: 20), // Left padding for the scroll
          _buildCard(
            context,
            true,
            'assets/infrared_sauna.png',
            'RECOMMENDED 30 MIN',
            'Infrared Sauna',
            'Science-backed treatment. Boost recovery. Burn calories. Build immunity. Improve sleep. Reduce stress. Increase energy. Improve focus. Promote balance.',
          ),
          SizedBox(width: 20),
          _buildCard(
            context,
            true,
            'assets/cold_plunge.png',
            'RECOMMENDED 30 MIN',
            'Cold Plunge',
            'Life-changing benefits. Cold water therapy has been shown to be effective with better sleep, elevated energy, pain and stress relief, a better mood, performance and recovery, and immune support.',
          ),
          SizedBox(width: 20),
          _buildCard(
            context,
            true,
            'assets/compression_therapy.png',
            'RECOMMENDED 30 MIN',
            'Compression Therapy',
            'Increases circulation and helps you maintain your full range of motion. Proven to help with lymphatic drainage, and decrease pain and soreness.',
          ),
          SizedBox(width: 20),
          _buildCard(
            context,
            true,
            'assets/led_light_therapy.png',
            'RECOMMENDED 30 MIN',
            'LED Light Therapy',
            'LightStim MultiWave® Patented Technology emits multiple wavelengths of light. ProPanel utilizes 1,400 medical-grade LEDs optimized for anti-aging, acne, or regeneration.',
          ),
          SizedBox(width: 20), // Right padding for the scroll
        ],
      ),
    );
  }

  // ------------------ Card Builder ------------------
  Widget _buildCard(BuildContext context, bool isMobile, String imagePath, String time, String title, String description) {
    // Define fixed sizes for mobile cards
    double mobileCardWidth = 300;  // Fixed width for mobile
    double mobileCardHeight = 450; // Fixed height for mobile

    return Container(
      width: isMobile ? mobileCardWidth : 625, // Mobile has fixed width, desktop is adjustable
      height: isMobile ? mobileCardHeight : 380, // Mobile has fixed height, desktop is adjustable
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            spreadRadius: 3,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: isMobile
          ? Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image section for mobile
                Container(
                  width: double.infinity,
                  height: 180, // Adjusted image height for mobile
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage(imagePath),
                      fit: BoxFit.cover,
                    ),
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(10),
                      topRight: Radius.circular(10),
                    ),
                  ),
                ),
                // Text section
                Padding(
                  padding: const EdgeInsets.all(10.0), // Reduce padding for mobile
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        time,
                        style: TextStyle(
                          color: Color(0xFF4A776D),
                          fontSize: 12,
                          fontFamily: 'Helvetica',
                          fontWeight: FontWeight.w400,
                          height: 1.2,
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        title,
                        style: TextStyle(
                          color: Color(0xFF113D33),
                          fontSize: 20,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w400,
                          height: 1.2,
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        description,
                        style: TextStyle(
                          color: Color(0xFF4A776D),
                          fontSize: 14,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w300,
                          height: 1.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            )
          : SizedBox(
              height: 380, // Fixed height for desktop cards
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Image section for desktop (on the left)
                  Container(
                    width: 250,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage(imagePath),
                        fit: BoxFit.cover,
                      ),
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(10),
                        bottomLeft: Radius.circular(10),
                      ),
                    ),
                  ),
                  // Text section for desktop (on the right)
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            time,
                            style: TextStyle(
                              color: Color(0xFF4A776D),
                              fontSize: 12,
                              fontFamily: 'Helvetica',
                              fontWeight: FontWeight.w400,
                              height: 1.2,
                            ),
                          ),
                          SizedBox(height: 8),
                          Text(
                            title,
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 25,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w400,
                              height: 1.2,
                            ),
                          ),
                          SizedBox(height: 8),
                          Text(
                            description,
                            style: TextStyle(
                              color: Color(0xFF4A776D),
                              fontSize: 14,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w300,
                              height: 1.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
