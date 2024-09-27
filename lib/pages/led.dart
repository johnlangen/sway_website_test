import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart'; // Green navbar
import '../widgets/footer.dart'; // Footer
import '../widgets/footer_mobile.dart'; // Mobile footer

class LEDPage extends StatelessWidget {
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
                Positioned(
                  top: isMobile ? 20 : 40,
                  left: 0,
                  right: 0,
                  child: NavBarGreen(), // Green Navbar at the top
                ),
                if (isMobile)
                  _buildMobileLayout(context)
                else
                  _buildDesktopLayout(context),
              ],
            ),
            SizedBox(height: 100),
            if (isMobile) FooterMobile() else Footer(), // Footer
          ],
        ),
      ),
    );
  }

  Widget _buildDesktopLayout(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(top: 160),
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        children: [
          SizedBox(height: 50),
          SizedBox(
            width: 351,
            child: Text(
              'LED LIGHT THERAPY',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF113D33),
                fontSize: 50,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.2,
              ),
            ),
          ),
          SizedBox(height: 30),
          SizedBox(
            width: 625,
            child: Text(
              'Experience the benefits of LED light therapy for skin rejuvenation and healing.',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 25,
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

  Widget _buildMobileLayout(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(top: 120),
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: 50),
          SizedBox(
            width: 351,
            child: Text(
              'LED LIGHT THERAPY',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF113D33),
                fontSize: 40,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.2,
              ),
            ),
          ),
          SizedBox(height: 30),
          SizedBox(
            width: 625,
            child: Text(
              'Experience the benefits of LED light therapy for skin rejuvenation and healing.',
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
}
