import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart';
import '../widgets/footer.dart';
import '../widgets/footer_mobile.dart';
import 'remedy_tech_page.dart'; // Import the remedy tech page

class TreatmentsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    bool isMobile = MediaQuery.of(context).size.width < 1000;

    return Scaffold(
      backgroundColor: Color(0xFFF7F4E9), // Cream background color
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(80), // Set the height for the Navbar
        child: NavBarGreen(), // Navbar that stays at the top
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(height: isMobile ? 150 : 200), // Adjust spacing to move content down

            // TREATMENT EXPERIENCES text
            SizedBox(
              width: 602,
              child: Text(
                'TREATMENT EXPERIENCES',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Color(0xFF113D33),
                  fontSize: isMobile ? 30 : 50, // Adjusted font size for mobile
                  fontFamily: 'Vance',
                  fontWeight: FontWeight.w400,
                  height: 1.2,
                ),
              ),
            ),
            SizedBox(height: 20), // Spacing between title and description

            // Description text
            SizedBox(
              width: 646,
              child: Text(
                'Experience the wellness you\'ve been longing for. Transform your health and confidence with our expert-led facials, massages, and scientific-backed remedy technologies.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Color(0xFF4A776D),
                  fontSize: isMobile ? 20 : 25,
                  fontFamily: 'Vance',
                  fontWeight: FontWeight.w400,
                  height: 1.5, // Increased height for better readability
                ),
              ),
            ),
            SizedBox(height: isMobile ? 70 : 100), // Increased spacing between description and images

            // Separate layouts for mobile and desktop
            isMobile ? _buildMobileLayout(context) : _buildResponsiveDesktopLayout(context),

            SizedBox(height: 150), // Increased spacing before the footer

            // Footer
            isMobile ? FooterMobile() : Footer(),
          ],
        ),
      ),
    );
  }

  Widget _buildMobileLayout(BuildContext context) {
    return Column(
      children: [
        _buildImageWithButton(
          context,
          "assets/treatment1.png",
          'Facials',
          '/facials',
          250,
          375,
          110,
          42,
          18,
        ),
        SizedBox(height: 30), // Spacing between images on mobile
        _buildImageWithButton(
          context,
          "assets/treatment2.png",
          'Remedy Room',
          '/remedy-tech',
          250,
          375,
          150,
          42,
          18,
        ),
        SizedBox(height: 30), // Spacing between images on mobile
        _buildImageWithButton(
          context,
          "assets/treatment3.png",
          'Massages',
          '/massages',
          250,
          375,
          110,
          42,
          18,
        ),
      ],
    );
  }

  Widget _buildResponsiveDesktopLayout(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double imageWidth = (screenWidth - 150) / 3; // Adjust image width based on screen size
    double imageHeight = imageWidth * 1.47; // Maintain aspect ratio
    double buttonFontSize = 18;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 50),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _buildImageWithButton(
            context,
            "assets/treatment1.png",
            'Facials',
            '/facials',
            imageWidth - 20, // Smaller images to avoid overflow
            imageHeight - 20,
            (imageWidth - 20) * 0.4,
            42,
            buttonFontSize,
          ),
          SizedBox(width: 30), // Spacing between images on desktop
          _buildImageWithButton(
            context,
            "assets/treatment2.png",
            'Remedy Room',
            '/remedy-tech',
            imageWidth - 20, // Smaller images to avoid overflow
            imageHeight - 20,
            (imageWidth - 20) * 0.5,
            42,
            buttonFontSize,
          ),
          SizedBox(width: 30), // Spacing between images on desktop
          _buildImageWithButton(
            context,
            "assets/treatment3.png",
            'Massages',
            '/massages',
            imageWidth - 20, // Smaller images to avoid overflow
            imageHeight - 20,
            (imageWidth - 20) * 0.4,
            42,
            buttonFontSize,
          ),
        ],
      ),
    );
  }

  Widget _buildImageWithButton(
    BuildContext context,
    String imagePath,
    String buttonText,
    String route,
    double imageWidth,
    double imageHeight,
    double buttonWidth,
    double buttonHeight,
    double buttonFontSize,
  ) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, route); // Navigate to the specified route when the button is clicked
      },
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: Stack(
          children: [
            Container(
              width: imageWidth,
              height: imageHeight,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage(imagePath),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Positioned(
              bottom: 20,
              right: 20,
              child: AnimatedContainer(
                duration: Duration(milliseconds: 200),
                width: buttonWidth,
                height: buttonHeight,
                decoration: ShapeDecoration(
                  color: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Padding(
                      padding: EdgeInsets.only(left: 10),
                      child: Text(
                        buttonText,
                        style: TextStyle(
                          color: Color(0xFF113D33),
                          fontSize: buttonFontSize,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w300,
                          height: 1.0,
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Icon(
                      Icons.arrow_forward_ios,
                      color: Color(0xFF113D33),
                      size: buttonFontSize,
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
