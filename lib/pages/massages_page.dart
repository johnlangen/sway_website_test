import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart';
import '../widgets/footer.dart'; // Add the correct import for Footer
import '../widgets/footer_mobile.dart'; // Add the correct import for FooterMobile

class MassagesPage extends StatelessWidget {
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
                // Navbar logic for mobile and desktop
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
            SizedBox(height: 100), // Space before the boost section
            if (isMobile) _buildBoostSection(true, context) else _buildBoostSection(false, context),
            SizedBox(height: 100), // Space before the footer
            if (isMobile) FooterMobile() else Footer(), // Footer section
          ],
        ),
      ),
    );
  }

  // ------------------ Desktop Layout ------------------
  Widget _buildDesktopLayout(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;

    return Container(
      width: double.infinity, // Ensure the green background goes edge to edge
      margin: EdgeInsets.only(top: 140),
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      decoration: BoxDecoration(
        color: Color(0xFFB6CFBF), // Green background
      ),
      child: Column(
        children: [
          SizedBox(height: 100), // Add more space above the content within the green background
          Stack(
            alignment: Alignment.center,
            clipBehavior: Clip.none, // Allow overflow to be visible
            children: [
              // "Massage" text on the left
              Positioned(
                left: -275, // Keep the same fixed position
                child: SizedBox(
                  width: 309,
                  child: Text(
                    'Massage',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Color(0xFF113D33),
                      fontSize: 40, // Keep the font size fixed
                      fontFamily: 'Vance-Text',
                      fontWeight: FontWeight.w400,
                      height: 0.02,
                    ),
                  ),
                ),
              ),
              // Dynamically resize photo in the middle
              Container(
                width: screenWidth > 1200 ? 591 : screenWidth * 0.5, // Shrinks the image as the screen size decreases
                height: (screenWidth > 1200 ? 591 : screenWidth * 0.5) * 0.73, // Maintain aspect ratio of the image
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage("assets/massage1.png"), // Replace with your actual image path
                    fit: BoxFit.cover,
                    alignment: Alignment.topCenter, // Align to the top to crop bottom
                  ),
                ),
              ),
              // "Experiences" text on the right
              Positioned(
                right: -300, // Keep the same fixed position
                child: SizedBox(
                  width: 319,
                  child: Text(
                    'Experiences',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Color(0xFF113D33),
                      fontSize: 40, // Keep the font size fixed
                      fontFamily: 'Vance-Text',
                      fontWeight: FontWeight.w400,
                      height: 0.02,
                    ),
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 50), // More space between the photo and the paragraph
          // Description text below the photo
          SizedBox(
            width: 625,
            child: Text(
              'Our expert-driven massage therapies combine advanced techniques with premium products to allow for all your stress to sway away. No stress, all relaxation.',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF113D33),
                fontSize: 25,
                fontFamily: 'Vance-Text',
                fontWeight: FontWeight.w400,
                height: 1.5, // Adjusted height for better spacing
              ),
            ),
          ),
          SizedBox(height: 100), // Extend green background farther down
        ],
      ),
    );
  }

  // ------------------ Mobile Layout ------------------
  Widget _buildMobileLayout(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(top: 100),
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      decoration: BoxDecoration(
        color: Color(0xFFB6CFBF),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: 50), // Add more space above the content within the green background
          // "Massage" text on top
          Text(
            'Massage',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Color(0xFF113D33),
              fontSize: 40,
              fontFamily: 'Vance-Text',
              fontWeight: FontWeight.w400,
              height: 1.2, // Adjusted height for spacing
            ),
          ),
          // "Experiences" text below "Massage"
          Text(
            'Experiences',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Color(0xFF113D33),
              fontSize: 40,
              fontFamily: 'Vance-Text',
              fontWeight: FontWeight.w400,
              height: 1.2, // Adjusted height for spacing
            ),
          ),
          SizedBox(height: 20),
          // Photo below the title
          Container(
            width: MediaQuery.of(context).size.width * 0.8, // Make image responsive to screen size
            height: MediaQuery.of(context).size.width * 0.6, // Maintain aspect ratio
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/massage1.png"), // Replace with your actual image path
                fit: BoxFit.cover,
                alignment: Alignment.topCenter, // Align to the top to crop bottom
              ),
            ),
          ),
          SizedBox(height: 50), // More space between the photo and the paragraph
          // Description text below the photo
          Text(
            'Our expert-driven massage therapies combine advanced techniques with premium products to allow for all your stress to sway away. No stress, all relaxation.',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Color(0xFF113D33),
              fontSize: 20,
              fontFamily: 'Vance-Text',
              fontWeight: FontWeight.w400,
              height: 1.5,
            ),
          ),
          SizedBox(height: 100), // Extend green background farther down
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
                  'assets/massage1.png', 
                  '50 MIN MASSAGE', 
                  'Deep Tissue', 
                  'Drop-In \$139 I Member \$99', 
                  'Deeply corrective. Releases muscle tension and toxins from the body. Relieves pain and discomfort in congested areas within muscles, tendons and ligaments due to stress, injury, or overuse to restore proper range of motion, leaving your body in a state of relaxation and gratitude.'
                ),
              ),
              SizedBox(width: 20),
              Flexible(
                child: _buildCard(
                  context, 
                  false, 
                  'assets/massage2.png', 
                  '50 MIN MASSAGE', 
                  'CBD', 
                  'Drop-In \$139 I Member \$99', 
                  'Our award-winning relief cream provides immediate cooling comfort with our revitalizing blend of water-soluble, broad-spectrum CBD*, menthol, camphor, capsicum, glucosamine and mushroom extracts.'
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
                  'assets/massage3.png', 
                  '50 MIN MASSAGE', 
                  'Salt Stone', 
                  'Drop-In \$139 I Member \$99', 
                  'Himalayan stones that contain 84 minerals which restores balance to your body while nourishing depleted muscles. Let your muscles melt under warm, salt stones that deeply penetrate tense muscles, releasing tension and toxins, leaving the body totally relaxed and renewed.'
                ),
              ),
              SizedBox(width: 20),
              Flexible(
                child: _buildCard(
                  context, 
                  false, 
                  'assets/massage4.png', 
                  '50 MIN MASSAGE', 
                  'Sports Massage', 
                  'Drop-In \$139 I Member \$99', 
                  'For the Athlete. Speed up recovery from intensive training. Ease tension in tight muscles and increase range of motion.'
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ------------------ Mobile Card Section (Horizontal Scroll) ------------------
  Widget _buildMobileCardSection(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Color(0xFFF7F4E9), // Cream background
      height: 500, // Height of the card section
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          SizedBox(width: 20), // Left padding for the scroll
          _buildCard(context, true, 'assets/massage1.png', '50 MIN MASSAGE', 'Deep Tissue', 'Drop-In \$139 I Member \$99', 'Deeply corrective. Releases muscle tension and toxins from the body. Relieves pain and discomfort in congested areas within muscles, tendons and ligaments due to stress, injury, or overuse to restore proper range of motion, leaving your body in a state of relaxation and gratitude.'), 
          SizedBox(width: 20),
          _buildCard(context, true, 'assets/massage2.png', '50 MIN MASSAGE', 'CBD', 'Drop-In \$139 I Member \$99', 'Our award-winning relief cream provides immediate cooling comfort with our revitalizing blend of water-soluble, broad-spectrum CBD*, menthol, camphor, capsicum, glucosamine and mushroom extracts.'), 
          SizedBox(width: 20),
          _buildCard(context, true, 'assets/massage3.png', '50 MIN MASSAGE', 'Salt Stone', 'Drop-In \$139 I Member \$99', 'Himalayan stones that contain 84 minerals which restores balance to your body while nourishing depleted muscles. Let your muscles melt under warm, salt stones that deeply penetrate tense muscles, releasing tension and toxins, leaving the body totally relaxed and renewed.'), 
          SizedBox(width: 20),
          _buildCard(context, true, 'assets/massage4.png', '50 MIN MASSAGE', 'Sports Massage', 'Drop-In \$139 I Member \$99', 'For the Athlete. Speed up recovery from intensive training. Ease tension in tight muscles and increase range of motion.'), 
          SizedBox(width: 20), // Right padding for the scroll
        ],
      ),
    );
  }

  // ------------------ Card Builder ------------------
  Widget _buildCard(BuildContext context, bool isMobile, String imagePath, String subtitle, String title, String price, String description) {
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
                        subtitle,
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
                        price,
                        style: TextStyle(
                          color: Color(0xFF4A776D),
                          fontSize: 15,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w300,
                          height: 1.2,
                        ),
                      ),
                      SizedBox(height: 10),
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
                Spacer(),
                // Book Now button
                Align(
                  alignment: Alignment.centerRight,
                  child: Container(
                    margin: EdgeInsets.only(right: 15, bottom: 10),
                    width: 130,
                    height: 40,
                    decoration: ShapeDecoration(
                      color: Color(0xFF4A776D),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(50),
                      ),
                    ),
                    child: Center(
                      child: Text(
                        'Book Now',
                        style: TextStyle(
                          color: Color(0xFFF6F7F6),
                          fontSize: 12,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ),
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
                            subtitle,
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
                            price,
                            style: TextStyle(
                              color: Color(0xFF4A776D),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w300,
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
                          Spacer(),
                          Align(
                            alignment: Alignment.centerRight,
                            child: Container(
                              margin: EdgeInsets.only(right: 15, bottom: 10),
                              width: 150,
                              height: 40,
                              decoration: ShapeDecoration(
                                color: Color(0xFF4A776D),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(50),
                                ),
                              ),
                              child: Center(
                                child: Text(
                                  'Book Now',
                                  style: TextStyle(
                                    color: Color(0xFFF6F7F6),
                                    fontSize: 14,
                                    fontFamily: 'Vance',
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                              ),
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

  // ------------------ Boost Section ------------------
  Widget _buildBoostSection(bool isMobile, BuildContext context) {
    return Container(
      color: Color(0xFFB6CFBF), // Green background for the boost section
      padding: const EdgeInsets.symmetric(vertical: 50, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(height: isMobile ? 80 : 100), // Add more space above the heading
          // Title
          SizedBox(
            width: 627,
            child: Text(
              'Elevate Your Massage with a Boost',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF113D33),
                fontSize: isMobile ? 22 : 30, // Smaller font for mobile
                fontFamily: 'Vance',
                fontWeight: FontWeight.w400,
                height: 1.2, // Adjusted height for better spacing
              ),
            ),
          ),
          SizedBox(height: 50),
          // Cards for desktop and mobile
          if (isMobile)
            _buildMobileBoostCards(context)
          else
            _buildDesktopBoostCards(context),
        ],
      ),
    );
  }

  Widget _buildMobileBoostCards(BuildContext context) {
    return Container(
      height: 550,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          _buildBoostCard(context, 'Infrared PEMF Mat', 'PEMF technology mimics the healing vibrations of the Earth, enhancing the body’s natural recovery process, reducing inflammation, increasing energy, relieving stress, and promoting deeper sleep.', false),
          SizedBox(width: 20),
          _buildBoostCard(context, 'Cupping', 'An ancient Chinese Medicine Technique that increases circulation and moves stagnant blood. Relieves muscle tension. Supports the immune system. Clears toxins. Reduces inflammation. Lymphatic detox.', false),
          SizedBox(width: 20),
          _buildBoostCard(context, 'Lymphatic Drainage', 'Works directly with your lymphatic and digestive systems. Increases your metabolic rate, rids excess toxins, and cleanses your colon. Flushes water retention, giving an instant leaner look. Improvements are also evident in the circulatory, respiratory and endocrine system.', true),
          SizedBox(width: 20),
          _buildBoostCard(context, 'Make it 80 mins', 'Enhance your relaxation experience by adding an extra 30 minutes to your massage service. This extended time allows you to truly unwind, allowing our skilled therapists to focus on your specific needs and melt away tension, leaving you feeling revitalized and deeply rejuvenated.', true),
          SizedBox(width: 20),
        ],
      ),
    );
  }

  Widget _buildDesktopBoostCards(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildBoostCard(context, 'Infrared PEMF Mat', 'PEMF technology mimics the healing vibrations of the Earth, enhancing the body’s natural recovery process, reducing inflammation, increasing energy, relieving stress, and promoting deeper sleep.', false),
            _buildBoostCard(context, 'Cupping', 'An ancient Chinese Medicine Technique that increases circulation and moves stagnant blood. Relieves muscle tension. Supports the immune system. Clears toxins. Reduces inflammation. Lymphatic detox.', false),
          ],
        ),
        SizedBox(height: 50),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildBoostCard(context, 'Lymphatic Drainage', 'Works directly with your lymphatic and digestive systems. Increases your metabolic rate, rids excess toxins, and cleanses your colon. Flushes water retention, giving an instant leaner look.', true),
            _buildBoostCard(context, 'Make it 80 mins', 'Enhance your relaxation experience by adding an extra 30 minutes to your massage service. This extended time allows you to truly unwind.', true),
          ],
        ),
      ],
    );
  }

  Widget _buildBoostCard(BuildContext context, String title, String description, bool isSuperBoost) {
    bool isMobile = MediaQuery.of(context).size.width < 1000;
    double screenWidth = MediaQuery.of(context).size.width;

    // For desktop, the cards shrink responsively but don't exceed max size
    double cardWidth = screenWidth * 0.3;
    double cardHeight = screenWidth * 0.5;
    double maxCardWidth = 389;
    double maxCardHeight = 510.68;

    // For mobile, fixed size
    double mobileCardWidth = 300;
    double mobileCardHeight = 450;

    return Container(
      width: isMobile ? mobileCardWidth : (cardWidth > maxCardWidth ? maxCardWidth : cardWidth), // Fixed width for mobile, responsive for desktop
      height: isMobile ? mobileCardHeight : (cardHeight > maxCardHeight ? maxCardHeight : cardHeight), // Fixed height for mobile, responsive for desktop
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.zero, // Remove rounded corners
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            spreadRadius: 3,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Align(
              alignment: Alignment.topRight,
              child: Container(
                width: isSuperBoost ? 110 : 56, // Increased width for "Super Boost" to fit the text
                height: 24.37,
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                decoration: ShapeDecoration(
                  color: isSuperBoost ? Color(0xFF113D33) : Color(0xFF4A776D),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(50),
                  ),
                ),
                child: Center(
                  child: Text(
                    isSuperBoost ? 'Super Boost' : 'Boost',
                    style: TextStyle(
                      color: Color(0xFFF6F7F6),
                      fontSize: 15,
                      fontFamily: 'Vance',
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                ),
              ),
            ),
            SizedBox(height: 30),
            Text(
              title,
              style: TextStyle(
                color: Color(0xFF113D33),
                fontSize: 25,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w300,
              ),
            ),
            SizedBox(height: 20),
            Expanded(
              child: SingleChildScrollView(
                physics: NeverScrollableScrollPhysics(),
                child: Text(
                  description,
                  style: TextStyle(
                    color: Color(0xFF113D33),
                    fontSize: 15,
                    fontFamily: 'Vance',
                    fontWeight: FontWeight.w300,
                    height: 1.5,
                  ),
                ),
              ),
            ),
            Text(
              'Drop-In +\$60 I Member +\$30',
              style: TextStyle(
                color: Color(0xFF113D33),
                fontSize: 15,
                fontFamily: 'Vance',
                fontWeight: FontWeight.w300,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
