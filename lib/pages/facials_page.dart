import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart';
import '../widgets/footer.dart'; // Add the correct import for Footer
import '../widgets/footer_mobile.dart'; // Add the correct import for FooterMobile

class FacialsPage extends StatelessWidget {
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
            // "Facial" text on the left
            Positioned(
              left: -275, // Keep the same fixed position
              child: SizedBox(
                width: 309,
                child: Text(
                  'Facial',
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
                  image: AssetImage("assets/facial1.png"), // Replace with your actual image path
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
            'Our science-backed, cutting edge facial treatments\nuse the world\'s most innovative tech and skincare\nproducts to deliver specific skin results. No downtime, all natural.',
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
          // "Facial" text on top
          Text(
            'Facial',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Color(0xFF113D33),
              fontSize: 40,
              fontFamily: 'Vance-Text',
              fontWeight: FontWeight.w400,
              height: 1.2, // Adjusted height for spacing
            ),
          ),
          // "Experiences" text below "Facial"
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
                image: AssetImage("assets/facial1.png"), // Replace with your actual image path
                fit: BoxFit.cover,
                alignment: Alignment.topCenter, // Align to the top to crop bottom
              ),
            ),
          ),
          SizedBox(height: 50), // More space between the photo and the paragraph
          // Description text below the photo
          Text(
            'Our science-backed, cutting edge facial treatments\nuse the world\'s most innovative tech and skincare\nproducts to deliver specific skin results. No downtime, all natural.',
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
                  'assets/facial2.png', 
                  '50 MIN FACIAL', 
                  'Forever Young', 
                  'Anti-Aging Facial', 
                  'Drop-In \$139 I Member \$99', 
                  'Defy aging with this all-natural facial that hydrates, brightens, and tightens your skin. Promotes circulation and collagen production.'
                ),
              ),
              SizedBox(width: 20),
              Flexible(
                child: _buildCard(
                  context, 
                  false, 
                  'assets/facial3.png', 
                  '50 MIN FACIAL', 
                  'Glow Getter', 
                  'Hydration Facial', 
                  'Drop-In \$139 I Member \$99', 
                  'Powerful antioxidants, correcting peptides, and plant-derived stem cells instantly smooth and firm for a brighter, more youthful complexion. Revitalizes the appearance of collagen-depleted skin. Promotes dewy, ultra-hydrated skin.'
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
                  'assets/facial4.png', 
                  '50 MIN FACIAL', 
                  'Pore Perfection', 
                  'Acne Facial', 
                  'Drop-In \$139 I Member \$99', 
                  'Our complexion-clearing facial treatment uses targeted products to detox and renew. Kills bacteria and treats congested skin. Includes extractions. Promotes clean and clear skin.'
                ),
              ),
              SizedBox(width: 20),
              Flexible(
                child: _buildCard(
                  context, 
                  false, 
                  'assets/facial5.png', 
                  '50 MIN FACIAL', 
                  'Sensitive Silk', 
                  'Soothing Facial.', 
                  'Drop-In \$139 I Member \$99', 
                  'Soothe, calm, and protect sensitized and reddened skin types. A natural skincare treatment that is gentle, yet very effective in visibly reducing skin redness and immediately providing soothing relief to irritated skin. Promotes clear and calm skin.'
                ),
              ),
            ],
          ),
          SizedBox(height: 50),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Flexible(
                child: _buildCard(
                  context, 
                  false, 
                  'assets/facial6.png', 
                  '50 MIN FACIAL', 
                  'Dr. Dennis Gross Vitamin C', 
                  'Sway Spotlight Facial', 
                  'Drop-In \$139 I Member \$99', 
                  '"C" the radiance with this supercharged facial loaded with Vitamin C—nature’s most potent and proven skin brightening treatment. Say goodbye to sun damage and hello to a glowing, even complexion.'
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
        _buildCard(context, true, 'assets/facial2.png', '50 MIN FACIAL', 'Forever Young', 'Anti-Aging Facial', 'Drop-In \$139 I Member \$99', 'Defy aging with this all-natural facial that hydrates, brightens, and tightens your skin. Promotes circulation and collagen production.'), 
        SizedBox(width: 20),
        _buildCard(context, true, 'assets/facial3.png', '50 MIN FACIAL', 'Glow Getter', 'Hydration Facial', 'Drop-In \$139 I Member \$99', 'Powerful antioxidants, correcting peptides, and plant-derived stem cells instantly smooth and firm for a brighter, more youthful complexion. Revitalizes the appearance of collagen-depleted skin. Promotes dewy, ultra-hydrated skin.'), 
        SizedBox(width: 20),
        _buildCard(context, true, 'assets/facial4.png', '50 MIN FACIAL', 'Pore Perfection', 'Acne Facial', 'Drop-In \$139 I Member \$99', 'Our complexion-clearing facial treatment uses targeted products to detox and renew. Kills bacteria and treats congested skin. Includes extractions. Promotes clean and clear skin.'), 
        SizedBox(width: 20),
        _buildCard(context, true, 'assets/facial5.png', '50 MIN FACIAL', 'Sensitive Silk', 'Soothing Facial.', 'Drop-In \$139 I Member \$99', 'Soothe, calm, and protect sensitized and reddened skin types. A natural skincare treatment that is gentle, yet very effective in visibly reducing skin redness and immediately providing soothing relief to irritated skin. Promotes clear and calm skin.'), 
        SizedBox(width: 20),
        _buildCard(context, true, 'assets/facial6.png', '50 MIN FACIAL', 'Dr. Dennis Gross Vitamin C', 'Sway Spotlight Facial', 'Drop-In \$139 I Member \$99', '"C" the radiance with this supercharged facial loaded with Vitamin C—nature’s most potent and proven skin brightening treatment. Say goodbye to sun damage and hello to a glowing, even complexion.'), 
        SizedBox(width: 20), // Right padding for the scroll
      ],


   
      ),
    );
  }

  // ------------------ Card Builder ------------------
Widget _buildCard(BuildContext context, bool isMobile, String imagePath, String title, String subtitle1, String subtitle2, String price, String description) {
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
                      title,
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
                      subtitle1,
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
                      subtitle2,
                      style: TextStyle(
                        color: Color(0xFF113D33),
                        fontSize: 15,
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
                          title,
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
                          subtitle1,
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
                          subtitle2,
                          style: TextStyle(
                            color: Color(0xFF113D33),
                            fontSize: 15,
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
            isMobile
                ? 'MAKE IT A HIGH TECH FACIAL\n& ADD A BOOST' // Force break into two lines on mobile
                : 'MAKE IT A HIGH TECH FACIAL & ADD A BOOST',
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
          _buildBoostCard(context, 'Microcurrent', 'Tones and Lifts. Stimulates facial muscles and collagen production.', false),
          SizedBox(width: 20),
          _buildBoostCard(context, 'LED Light Therapy', 'Reduces inflammation and decreases harmful bacteria.', false),
          SizedBox(width: 20),
          _buildBoostCard(context, 'Hydraderm', 'Deeply penetrating serums that resurface the skin.', false),
          SizedBox(width: 20),
          _buildBoostCard(context, 'Dermaflash', 'Exfoliates dead skin cells and removes peach fuzz.', false),
          SizedBox(width: 20),
          _buildBoostCard(context, 'Peel', 'Our chemical peels refine pores and even skin tone.', false),
          SizedBox(width: 20),
          _buildBoostCard(context, 'Oxygen Infusion', 'Cooling, calming oxygen improves skin hydration.', true),
          SizedBox(width: 20),
          _buildBoostCard(context, 'Ultrasound', 'Lorem ipsum dolor sit amet consectetur.', true),
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
            _buildBoostCard(context, 'Microcurrent', 'Tones and Lifts. Stimulates facial muscles and collagen production.', false),
            _buildBoostCard(context, 'LED Light Therapy', 'Reduces inflammation and decreases harmful bacteria.', false),
            _buildBoostCard(context, 'Hydraderm', 'Deeply penetrating serums that resurface the skin.', false),
          ],
        ),
        SizedBox(height: 50),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildBoostCard(context, 'Dermaflash', 'Exfoliates dead skin cells and removes peach fuzz.', false),
            _buildBoostCard(context, 'Peel', 'Our chemical peels refine pores and even skin tone.', false),
            _buildBoostCard(context, 'Oxygen Infusion', 'Cooling, calming oxygen improves skin hydration.', true),
          ],
        ),
        SizedBox(height: 50),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildBoostCard(context, 'Ultrasound', 'Lorem ipsum dolor sit amet consectetur.', true),
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
          // Insert the detailed descriptions here for each card
          Expanded(
            child: SingleChildScrollView(
              physics: NeverScrollableScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (title == "Microcurrent")
                    Text.rich(
                      TextSpan(
                        children: [
                          TextSpan(
                            text: 'Tones and Lifts. Stimulates facial muscles and collagen production to sculpt and strengthen your skin.\n\n',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w300,
                              height: 1.5,
                            ),
                          ),
                          TextSpan(
                            text: 'Mini ',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w400,
                              height: 1.5,
                            ),
                          ),
                          TextSpan(
                            text: '- Target one focus area for an instant lift (eyes, cheeks, forehead, jawline, smile line)\n\n',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w300,
                              height: 1.5,
                            ),
                          ),
                          TextSpan(
                            text: 'Full ',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w400,
                              height: 1.5,
                            ),
                          ),
                          TextSpan(
                            text: '- Targets the entire face for an instant lifted look.\n',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w300,
                              height: 1.5,
                            ),
                          ),
                        ],
                      ),
                    )
                  else if (title == "LED Light Therapy")
                    Text.rich(
                      TextSpan(
                        children: [
                          TextSpan(
                            text: 'An advanced treatment that uses specific wavelengths of light to penetrate the skin, targeting a variety of concerns including skin rejuvenation, tissue repair, and collagen stimulation. It effectively reduces inflammation and decreases harmful bacteria, resulting in a healthier, more radiant complexion.\n\n',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w300,
                              height: 1.5,
                            ),
                          ),
                          TextSpan(
                            text: 'Mini - ',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w400,
                              height: 1.5,
                            ),
                          ),
                          TextSpan(
                            text: 'Target one area for acne, aging, or skin regeneration\n\n',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w300,
                              height: 1.5,
                            ),
                          ),
                          TextSpan(
                            text: 'Full - ',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w400,
                              height: 1.5,
                            ),
                          ),
                          TextSpan(
                            text: 'Targets the entire face.\n',
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 15,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w300,
                              height: 1.5,
                            ),
                          ),
                        ],
                      ),
                    )
                  else if (title == "Hydraderm")
                    Text(
                      'Deeply penetrating serums help correct and improve the appearance of fine lines and wrinkles, decrease appearance of scarring, minimize pores, help even complexion and reduce hyperpigmentation. A result-driven treatment that resurfaces the skin to create a smooth, fresh, more youthful glow. Uses Diamond tone microdermabrasion.\n',
                      style: TextStyle(
                        color: Color(0xFF113D33),
                        fontSize: 15,
                        fontFamily: 'Vance',
                        fontWeight: FontWeight.w300,
                        height: 1.5,
                      ),
                    )
                  else if (title == "Peel")
                    Text(
                      'Our specially formulated chemical peels cater to all skin types. Our expert estheticians will analyze your skin and prescribe the best peel for your skin type that will deliver results. Facial peels refine pores, even skin tone and can dramatically stimulate collagen production. Peels also reduce the appearance of fine lines, sun damage, scars, and blemishes.\n',
                      style: TextStyle(
                        color: Color(0xFF113D33),
                        fontSize: 15,
                        fontFamily: 'Vance',
                        fontWeight: FontWeight.w300,
                        height: 1.5,
                      ),
                    )
                  else if (title == "Dermaflash")
                    Text(
                      'This quick and effective treatment exfoliates dead skin cells and removes peach fuzz, enhancing product absorption and leaving your complexion instantly brighter and more youthful. Believe us… you\'ll get hooked on this.\n',
                      style: TextStyle(
                        color: Color(0xFF113D33),
                        fontSize: 15,
                        fontFamily: 'Vance',
                        fontWeight: FontWeight.w300,
                        height: 1.5,
                      ),
                    )
                  else if (title == "Oxygen Infusion")
                    Text(
                      'Cooling, calming oxygen infused onto the skin to aid in the absorption of serums and naturally improve skin hydration levels. This technology is used with 98% pure oxygen to ensure the deep penetration of active ingredients. Breathe life back into your skin.\n',
                      style: TextStyle(
                        color: Color(0xFF113D33),
                        fontSize: 15,
                        fontFamily: 'Vance',
                        fontWeight: FontWeight.w300,
                        height: 1.5,
                      ),
                    )
                  else if (title == "Ultrasound")
                    Text(
                      'Lorem ipsum dolor sit amet consectetur. Ut consectetur semper cursus non augue egestas quam condimentum vel. Non faucibus eu dolor a vehicula. Sapien arcu rhoncus placerat molestie integer. Nascetur tempor pellentesque id euismod morbi vitae. Ipsum sem amet pellentesque condimentum.\n',
                      style: TextStyle(
                        color: Color(0xFF113D33),
                        fontSize: 15,
                        fontFamily: 'Vance',
                        fontWeight: FontWeight.w300,
                        height: 1.5,
                      ),
                    ),
                ],
              ),
            ),
          ),
          // Remove Spacer and directly put the price text at the bottom
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
