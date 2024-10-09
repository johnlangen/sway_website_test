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
                    image: AssetImage('assets/homepage_photo2.png'), // Local image reference
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
                        'RECOMMENDED 20 MIN',
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
                        'Sauna',
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
                      'Drop-In \$49 I Member \$25',
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
                        'Science-backed Treatment. Boost recovery. Burn calories.\nBuild immunity. Improve sleep. Reduce stress. Increase energy.\nImprove focus. Promote balance.',
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
                    // Cross bullet points for recommended
                    SizedBox(
                      width: 388 * scaleFactor,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildBulletPoint('Reducing Stress and Anxiety', scaleFactor),
                          _buildBulletPoint('Improving Skin Health', scaleFactor),
                          _buildBulletPoint('Anyone that suffers from Arthritis', scaleFactor),
                          _buildBulletPoint('Those needing detoxification', scaleFactor),
                          _buildBulletPoint('Muscle pain and joint stiffness', scaleFactor),
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
                image: AssetImage('assets/homepage_photo2.png'),
                fit: BoxFit.fill,
              ),
            ),
          ),
          SizedBox(height: 20),
          // Text elements stacked below, aligned left
          Text(
            'RECOMMENDED 20 MIN',
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
            'Sauna',
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
            'Drop-In \$49 I Member \$25',
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
              _buildBulletPoint('Reducing Stress and Anxiety', 1.0),
              _buildBulletPoint('Improving Skin Health', 1.0),
              _buildBulletPoint('Anyone that suffers from Arthritis', 1.0),
              _buildBulletPoint('Those needing detoxification', 1.0),
              _buildBulletPoint('Muscle pain and joint stiffness', 1.0),
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
        'BURN BABY BURN',
        'Burn calories by raising your core body temperature, which increases your heart rate and metabolic rate. This heightened state mimics the effects of moderate exercise, leading to calorie expenditure and potential weight loss.',
      ),
      _buildBoxContent(
        'DETOX',
        'Boosts blood circulation and stimulates sweat glands, helping release toxins. Regular sessions will detoxify your body of harmful metals like lead, mercury, and other toxic compounds.',
      ),
      _buildBoxContent(
        'RAPID RECOVERY',
        'Speeds up recovery by increasing blood flow, which delivers more oxygen and nutrients to muscles and tissues, promoting faster healing. The deep heat also helps reduce inflammation and soothe sore muscles.',
      ),
      _buildBoxContent(
        'STRENGTHEN IMMUNITY',
        'Raises your core body temperature, which stimulates the production of white blood cells and improves circulation. This process enhances your body\'s natural defense mechanisms, making it more effective at fighting off infections and illnesses.',
      ),
    ];
  }

  // Define the mind boxes content with lighter text
  List<Widget> _buildMindBoxes({bool lighterText = false}) {
    return [
      _buildBoxContent(
        'REDUCE STRESS',
        'Promotes relaxation. The increased blood circulation and release of endorphins enhance mood and reduce the levels of stress hormones like cortisol, providing a calming and therapeutic experience.',
        lighterText: lighterText,
      ),
      _buildBoxContent(
        'DEEPER SLEEP',
        'Relaxes the nervous system by increasing blood flow and releasing tension, which reduces overall stress levels. This calming effect on the nervous system lowers the body\'s fight-or-flight response, making it easier to fall asleep and achieve a deeper, more restorative sleep.',
        lighterText: lighterText,
      ),
      _buildBoxContent(
        'ENHANCE MOOD',
        'Endorphin release promotes a sense of well-being and happiness. The heat from the also stimulates serotonin production, a neurotransmitter that enhances mood. Hence, one of the many reasons why Sway will become your happy place!',
        lighterText: lighterText,
      ),
      _buildBoxContent(
        'MENTAL CLARITY',
        'Increases blood flow to the brain, which enhances oxygen and nutrient delivery to brain cells. This improved circulation, combined with the relaxation effects, reduces mental fatigue and sharpens cognitive function.',
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
