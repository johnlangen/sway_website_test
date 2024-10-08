import 'package:flutter/material.dart';
import '../widgets/nav_bar_green.dart'; // Green navbar
import '../widgets/footer.dart'; // Footer
import '../widgets/footer_mobile.dart'; // Mobile footer

class CompressionPage extends StatelessWidget {
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
            if (isMobile) FooterMobile() else Footer(), // Footer section
          ],
        ),
      ),
    );
  }

  // ------------------ Desktop Layout ------------------
  Widget _buildDesktopLayout(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double scaleFactor = screenWidth < 1500 ? screenWidth / 1500 : 1.0;

    return Container(
      width: double.infinity, // Ensure the background goes edge to edge
      margin: EdgeInsets.only(top: 160), // Space below the navbar
      padding: EdgeInsets.symmetric(horizontal: 100.0 * scaleFactor), // Increased padding for more room
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image to the left
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 599 * scaleFactor,
                height: 664 * scaleFactor,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/compression_therapy.png'), // Local image reference
                    fit: BoxFit.fill,
                  ),
                ),
              ),
              SizedBox(width: 100 * scaleFactor), // More space between image and text
              // Text on the right
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      width: 192 * scaleFactor,
                      child: Text(
                        'RECOMMENDED 30 MIN',
                        style: TextStyle(
                          color: Color(0xFF4A776D),
                          fontSize: 15 * scaleFactor,
                          fontFamily: 'Helvetica',
                          fontWeight: FontWeight.w400,
                          height: 1.5, // Adjust height
                        ),
                      ),
                    ),
                    SizedBox(height: 10 * scaleFactor),
                    SizedBox(
                      width: 485 * scaleFactor,
                      child: Text(
                        'Normatec Lymphatic Drainage Boots',
                        style: TextStyle(
                          color: Color(0xFF113D33),
                          fontSize: 50 * scaleFactor,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w300,
                          height: 1.2,
                        ),
                      ),
                    ),
                    SizedBox(height: 20 * scaleFactor),
                    Text(
                      '4x Visits a Month\nDrop-In \$139 I Member \$99',
                      style: TextStyle(
                        color: Color(0xFF4A776D),
                        fontSize: 20 * scaleFactor,
                        fontFamily: 'Vance',
                        fontWeight: FontWeight.w400,
                        height: 1.5,
                      ),
                    ),
                    SizedBox(height: 20 * scaleFactor),
                    SizedBox(
                      width: 624 * scaleFactor,
                      child: Text(
                        'Compression therapy that increases circulation and helps you maintain your full range of motion. Proven to help with lymphatic drainage, and decrease pain and soreness.',
                        style: TextStyle(
                          color: Color(0xFF4A776D),
                          fontSize: 25 * scaleFactor,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w300,
                          height: 1.5,
                        ),
                      ),
                    ),
                    SizedBox(height: 20 * scaleFactor),
                    SizedBox(
                      width: 213 * scaleFactor,
                      child: Text(
                        'Recommended for',
                        style: TextStyle(
                          color: Color(0xFF4A776D),
                          fontSize: 25 * scaleFactor,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w400,
                          height: 1.5,
                        ),
                      ),
                    ),
                    SizedBox(height: 10 * scaleFactor),
                    SizedBox(
                        width: 388 * scaleFactor,
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                            _buildBulletPoint('Alleviating muscle fatigue and soreness', scaleFactor),
                            _buildBulletPoint('Reducing inflammation and swelling', scaleFactor),
                            _buildBulletPoint('Enhancing lymphatic drainage for detoxification', scaleFactor),
                            _buildBulletPoint('Accelerating post-workout recovery', scaleFactor),
                            _buildBulletPoint('Supporting joint health and flexibility', scaleFactor),
                            _buildBulletPoint('Improving blood circulation and oxygen delivery', scaleFactor),
                            ],

                        ),
                    ),
                    SizedBox(height: 30 * scaleFactor),
                    // Button Text
                    GestureDetector(
                      onTap: () {
                        // Add button action here
                      },
                      child: Container(
                        width: 250, // Adjusted for single line
                        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                        decoration: BoxDecoration(
                          color: Color(0xFF4A776D),
                          borderRadius: BorderRadius.circular(50),
                        ),
                        child: Text(
                          'Schedule Your Wellness',
                          style: TextStyle(
                            color: Color(0xFFF6F7F6),
                            fontSize: 18,
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
          SizedBox(height: 50), // Add some space after the top section
          // First box section
          _buildSectionTitle('RESTORE YOUR BODY'),
          _buildBoxSection('Body', _buildBodyBoxes(), isMobile: false),
          SizedBox(height: 50), // Space between sections
          _buildSectionTitle('REFRESH YOUR MIND'),
          _buildBoxSection('Mind', _buildMindBoxes(lighterText: true), isMobile: false), // Lighter text for the second section
          SizedBox(height: 30),
          // Second button
          GestureDetector(
            onTap: () {
              // Add button action here
            },
            child: Container(
              width: 250, // Adjusted for single line
              padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
              decoration: BoxDecoration(
                color: Color(0xFF4A776D),
                borderRadius: BorderRadius.circular(50),
              ),
              child: Center(
                child: Text(
                  'Schedule Your Wellness',
                  style: TextStyle(
                    color: Color(0xFFF6F7F6),
                    fontSize: 18,
                    fontFamily: 'Vance',
                    fontWeight: FontWeight.w400,
                    height: 1.2,
                  ),
                ),
              ),
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
                image: AssetImage('assets/compression_therapy.png'),
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
            'Normatec Lymphatic Drainage Boots',
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
            'Compression therapy that increases circulation and helps you maintain your full range of motion. Proven to help with lymphatic drainage, and decrease pain and soreness.',
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
                    _buildBulletPoint('Alleviating muscle fatigue and soreness', 1.0),
                    _buildBulletPoint('Reducing inflammation and swelling', 1.0),
                    _buildBulletPoint('Enhancing lymphatic drainage for detoxification', 1.0),
                    _buildBulletPoint('Accelerating post-workout recovery', 1.0),
                    _buildBulletPoint('Supporting joint health and flexibility', 1.0),
                    _buildBulletPoint('Improving blood circulation and oxygen delivery', 1.0),
                ],
                ),

          SizedBox(height: 30),
          // Button Text
          GestureDetector(
            onTap: () {
              // Add button action here
            },
            child: Container(
              width: 250, // Adjusted for single line on mobile
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
          SizedBox(height: 30),
          // Body boxes section on mobile (scrollable)
          _buildSectionTitle('RESTORE YOUR BODY'),
          _buildMobileScrollableBoxSection('Body', _buildBodyBoxes()),
          SizedBox(height: 30),
          _buildSectionTitle('REFRESH YOUR MIND'),
          _buildMobileScrollableBoxSection('Mind', _buildMindBoxes(lighterText: true)),
        ],
      ),
    );
  }

  // Method to build bullet points
  Widget _buildBulletPoint(String text, double scaleFactor) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '+', // Cross bullet point
            style: TextStyle(
              color: Color(0xFF4A776D),
              fontSize: 18 * scaleFactor, // Adjust size of the bullet point
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
                fontSize: 18 * scaleFactor,
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

  // Method to build each box with the tag and content
  Widget _buildBox(String tag, Widget content) {
    return Container(
      width: 298,
      height: 277,
      decoration: BoxDecoration(
        color: tag == 'Body' ? Color(0xFFB5CFBF) : Color(0xFF113D33),
        borderRadius: BorderRadius.circular(0), // No more rounding to ensure square boxes
      ),
      child: Stack(
        children: [
          Positioned(
            top: 10,
            right: 10,
            child: _buildTag(tag),
          ),
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: content,
          ),
        ],
      ),
    );
  }

  // Helper to build the tag in the upper right of each box
  Widget _buildTag(String tag) {
    return Container(
      width: 53,
      height: 24,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
      decoration: ShapeDecoration(
        color: tag == 'Body' ? Color(0xFF4A776D) : Color(0xFFB5CFBF),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(50),
        ),
      ),
      child: Center(
        child: Text(
          tag,
          style: TextStyle(
            color: Color(0xFFF6F7F6),
            fontSize: 13, // Smaller text for the tag
            fontFamily: 'Vance',
            fontWeight: FontWeight.w300,
          ),
        ),
      ),
    );
  }

  // Helper to build section titles
  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 0, bottom: 20), // Adjust spacing as needed
      child: Text(
        title,
        style: TextStyle(
          color: Color(0xFF113D33),
          fontSize: 30,
          fontFamily: 'Vance',
          fontWeight: FontWeight.w400,
        ),
      ),
    );
  }

  // Helper to build the box section for desktop
  Widget _buildBoxSection(String tag, List<Widget> boxes, {required bool isMobile}) {
    return isMobile
        ? _buildMobileScrollableBoxSection(tag, boxes)
        : Wrap(
            spacing: 20,
            runSpacing: 20,
            alignment: WrapAlignment.center, // Center alignment for mobile
            children: boxes.map((box) => _buildBox(tag, box)).toList(),
          );
  }

  // Helper to build the scrollable box section for mobile
  Widget _buildMobileScrollableBoxSection(String tag, List<Widget> boxes) {
    return Container(
      height: 300,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: boxes.map((box) => Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: _buildBox(tag, box),
        )).toList(),
      ),
    );
  }

  // Define the body boxes content
  List<Widget> _buildBodyBoxes() {
    return [
      _buildBoxContent(
        'RAPID RECOVERY',
        'Scientific sequential compression to the legs increases blood flow and aids in the removal of lactic acid and other metabolic byproducts, reducing muscle soreness.',
      ),
      _buildBoxContent(
        'DETOX',
        'This rhythmic compression and release cycle enhances lymphatic flow, helping to move fluid and waste products out of the limbs and back toward the core, where they can be processed and eliminated by the body.',
      ),
      _buildBoxContent(
        'INCREASE MOBILITY',
        'Helps improve range of motion and flexibility by reducing muscle stiffness and enhancing overall muscle function.',
      ),
    ];
  }

  // Define the mind boxes content with lighter text
  List<Widget> _buildMindBoxes({bool lighterText = false}) {
    return [
      _buildBoxContent(
        'Enhanced Relaxation',
        'Can induce a meditative state, contributing to overall mental relaxation. The relaxation and muscle recovery benefits can also contribute to more restful and rejuvenating sleep.',
        lighterText: lighterText,
      ),
    ];
  }

  // Helper to build content inside each box
  Widget _buildBoxContent(String title, String description, {bool lighterText = false}) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 192,
            child: Text(
              title,
              style: TextStyle(
                color: lighterText ? Color(0xFFF6F7F6) : Color(0xFF4A776D),
                fontSize: 12,
                fontFamily: 'Helvetica',
                fontWeight: FontWeight.w700,
                height: 1.2,
              ),
            ),
          ),
          SizedBox(height: 10),
          SizedBox(
            width: 262,
            child: Text(
              description,
              style: TextStyle(
                color: lighterText ? Color(0xFFF6F7F6) : Color(0xFF4A776D),
                fontSize: 12,
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
