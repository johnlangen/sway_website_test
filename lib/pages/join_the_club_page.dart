import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../widgets/nav_bar.dart';
import '../widgets/footer.dart';
import '../widgets/footer_mobile.dart';
import 'package:video_player/video_player.dart';  // Import for video player

class JoinTheClubPage extends StatefulWidget {
  @override
  _JoinTheClubPageState createState() => _JoinTheClubPageState();
}

class _JoinTheClubPageState extends State<JoinTheClubPage> {
  VideoPlayerController? _mobileVideoController;
  VideoPlayerController? _desktopVideoController;

  int? _openedIndex;  // This will track which dropdown is open
  bool _isNestedOpen = false;  // This will track if the nested dropdown is open

  @override
    void initState() {
      super.initState();
      
      // Initialize the mobile video controller for 'background2.mov'
      _mobileVideoController = VideoPlayerController.asset('assets/background2.mov')
        ..initialize().then((_) {
          setState(() {
            _mobileVideoController!.setLooping(true);
            _mobileVideoController!.setVolume(0.0); // Mute the mobile video
            _mobileVideoController!.play(); // Start playing the video
          });
        });

      // Initialize the desktop video controller for 'background2.mov'
      _desktopVideoController = VideoPlayerController.asset('assets/background2.mov')
        ..initialize().then((_) {
          setState(() {
            _desktopVideoController!.setLooping(true);
            _desktopVideoController!.setVolume(0.0); // Mute the desktop video
            _desktopVideoController!.play(); // Start playing the video
          });
        });
    }

  @override
  void dispose() {
    _mobileVideoController?.dispose();
    _desktopVideoController?.dispose();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {
    bool isMobile = MediaQuery.of(context).size.width < 700;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // First Section with Background Video, Text, and Button
            Stack(
              children: [
                // Constrain the video to a specific height for mobile
                // Video wrapped with IgnorePointer
                IgnorePointer(
                  child: isMobile
                      ? _mobileVideoController!.value.isInitialized
                          ? Container(
                              height: MediaQuery.of(context).size.height,
                              child: FittedBox(
                                fit: BoxFit.cover,
                                child: SizedBox(
                                  width: _mobileVideoController!.value.size.width,
                                  height: _mobileVideoController!.value.size.height,
                                  child: VideoPlayer(_mobileVideoController!),
                                ),
                              ),
                            )
                          : Container(
                              height: MediaQuery.of(context).size.height,
                              color: Colors.black,
                            )
                      : _desktopVideoController!.value.isInitialized
                          ? Container(
                              height: MediaQuery.of(context).size.height,
                              width: MediaQuery.of(context).size.width,
                              child: FittedBox(
                                fit: BoxFit.cover,
                                child: SizedBox(
                                  width: _desktopVideoController!.value.size.width,
                                  height: _desktopVideoController!.value.size.height,
                                  child: VideoPlayer(_desktopVideoController!),
                                ),
                              ),
                            )
                          : Container(
                              height: MediaQuery.of(context).size.height,
                              color: Colors.black,
                            ),
                ),




                // Navbar positioned above the background
                Positioned(
                  top: 50,
                  left: 0,
                  right: 0,
                  child: NavBar(),
                ),

                // Text and Join Now button on top of the background
                Positioned(
                  bottom: 50,
                  left: isMobile ? 30 : 70,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'EXPERIENCE THE WELLNESS\nYOU\'VE BEEN LONGING FOR',
                        style: TextStyle(
                          color: Color(0xFFF6F7F6),
                          fontSize: isMobile
                              ? MediaQuery.of(context).size.width * 0.07
                              : 50,
                          fontFamily: 'Vance',
                          fontWeight: FontWeight.w400,
                          height: 1.2,
                        ),
                      ),
                      SizedBox(height: 20),
                      MouseRegion(
                        cursor: SystemMouseCursors.click,
                        child: GestureDetector(
                          key: ValueKey('join_now_top'),
                          onTap: () async {
                            const url = 'https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100';
                            if (await canLaunch(url)) {
                              await launch(url);
                            } else {
                              throw 'Could not launch $url';
                            }
                          },
                          child: AnimatedContainer(
                            duration: Duration(milliseconds: 200),
                            padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                            decoration: BoxDecoration(
                              color: Color(0xFF4A776D),
                              borderRadius: BorderRadius.circular(50),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black26,
                                  offset: Offset(0, 4),
                                  blurRadius: 10,
                                ),
                              ],
                            ),
                            child: Text(
                              'Join Now',
                              style: TextStyle(
                                color: Color(0xFFF6F7F6),
                                fontSize: isMobile ? 16 : 18,
                                fontFamily: 'Helvetica',
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                          ),
                        ),
                      ),

                    ],
                  ),
                ),
              ],
            ),
            // Second Section with Creamish Background, Text, and Image
            Container(
              color: Color(0xFFF7F4E9), // Creamish background color
              padding: EdgeInsets.symmetric(vertical: 150, horizontal: isMobile ? 20 : 80), // Adjusted padding for mobile
              child: isMobile
                  ? Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        // Inclusive Club text above the image for mobile
                        Text(
                          'Inclusive Club.\nExclusive Perks.',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Color(0xFF113D33),
                            fontSize: isMobile
                              ? MediaQuery.of(context).size.width * 0.06 // Shrinks with screen size on mobile
                              : 50, // Standard size on desktop
                            fontFamily: 'Vance',
                            fontWeight: FontWeight.w400,
                            height: 1.2,
                          ),
                        ),
                        SizedBox(height: 20),
                        // Image in the middle
                        Container(
                          width: 591,
                          height: 400,
                          decoration: BoxDecoration(
                            image: DecorationImage(
                              image: AssetImage('assets/join2.png'), // Replace with join2.png
                              fit: BoxFit.cover, // Use BoxFit.cover to maintain aspect ratio
                            ),
                          ),
                        ),
                        SizedBox(height: 20),
                        // Become a member text below the image for mobile
                        Text(
                          'Become a member today.',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Color(0xFF113D33),
                            fontSize: isMobile 
                              ? MediaQuery.of(context).size.width * 0.06 // Shrinks with screen size on mobile
                              : 50, // Standard size on desktop
                            fontFamily: 'Vance',
                            fontWeight: FontWeight.w400,
                            height: 1.2, // Adjusted for better readability
                          ),
                        ),
                        SizedBox(height: 20),
                        // "Join Now" button with animation and link for mobile
                        MouseRegion(
                          cursor: SystemMouseCursors.click,
                          child: GestureDetector(
                            key: ValueKey('join_now_bottom'),
                            onTap: () async {
                              const url = 'https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100';
                              if (await canLaunch(url)) {
                                await launch(url);
                              } else {
                                throw 'Could not launch $url';
                              }
                            },
                            child: AnimatedContainer(
                              duration: Duration(milliseconds: 200),
                              padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                              decoration: BoxDecoration(
                                color: Color(0xFF4A776D),
                                borderRadius: BorderRadius.circular(50),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black26,
                                    offset: Offset(0, 4),
                                    blurRadius: 10,
                                  ),
                                ],
                              ),
                              child: Text(
                                'Join Now',
                                style: TextStyle(
                                  color: Color(0xFFF6F7F6),
                                  fontSize: isMobile ? 16 : 18,
                                  fontFamily: 'Helvetica',
                                  fontWeight: FontWeight.w400,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    )
                  : Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        // Left text: "Inclusive club. Exclusive Perks."
                        Expanded(
                          flex: 1,
                          child: Text(
                            'Inclusive Club.\nExclusive Perks.',
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
                        // Middle image
                        Expanded(
                          flex: 1,
                          child: Container(
                            width: 591,
                            height: 675,
                            decoration: BoxDecoration(
                              image: DecorationImage(
                                image: AssetImage('assets/join2.png'), // Replace with join2.png
                                fit: BoxFit.cover, // Use BoxFit.cover to maintain aspect ratio
                              ),
                            ),
                          ),
                        ),
                        // Right text: "Become a member today."
                        Expanded(
                          flex: 1,
                          child: Text(
                            'Become a member today.',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Color(0xFF113D33),
                              fontSize: 50,
                              fontFamily: 'Vance',
                              fontWeight: FontWeight.w400,
                              height: 1.2, // Adjusted for better readability
                            ),
                          ),
                        ),
                      ],
                    ),
            ),

            
            
          // Section with Background Image, Text, and CTA Button
          Container(
            padding: EdgeInsets.symmetric(vertical: 100, horizontal: isMobile ? 10 : 150),
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/offerbackground.png'), // Background image
                fit: BoxFit.cover,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // First Line: Opening November 2024
                Text(
                  'Opening November 2024! ',
                  style: TextStyle(
                    color: Color(0xFF113D33),
                    fontSize: isMobile ? 20 : 28, // Slightly smaller text
                    fontFamily: 'Vance-Text',
                    fontWeight: FontWeight.w400, // Less bold
                    height: 1.2,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 20),

                // Second Line: Details about early access and Remedy Room
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: isMobile ? 10 : 80), // Reduce left/right padding
                  child: Text(
                    'Denver\'s first-of-its-kind spa blending tech and tradition. Be among the first to experience the new wave of wellness.\n\n'
                    'Receive early access to Sway’s \$99 membership, which includes a targeted facial or massage every month. PLUS, enjoy 6 months of FREE access to the Remedy Room—featuring Sauna, Cold Plunge, LED Light Therapy, and Normatec Lymphatic Drainage Boots (\$240 value)!',
                    style: TextStyle(
                      color: Color(0xFF113D33),
                      fontSize: isMobile ? 16 : 18,
                      fontFamily: 'Vance-Text',
                      fontWeight: FontWeight.w400,
                      height: 1.2,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                SizedBox(height: 20),

                // Bold and Underlined text: 50 spots available
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: isMobile ? 10 : 150), 
                  child: Text.rich(
                    TextSpan(
                      text: 'Only ', 
                      style: TextStyle(
                        color: Color(0xFF113D33),
                        fontSize: isMobile ? 16 : 18,
                        fontFamily: 'Vance-Text',
                        fontWeight: FontWeight.w400,
                        height: 1.2,
                      ),
                      children: [
                        TextSpan(
                          text: '50 spots available', 
                          style: TextStyle(
                            fontWeight: FontWeight.bold, // Bold
                            decoration: TextDecoration.underline, // Underline
                          ),
                        ),
                        TextSpan(text: ', Offer Expires 9.29.24'),
                      ],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                SizedBox(height: 20),

                // CTA Button: Become a Founding Member
                MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: GestureDetector(
                    onTap: () async {
                      const url = 'https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100';
                      if (await canLaunch(url)) {
                        await launch(url);
                      } else {
                        throw 'Could not launch $url';
                      }
                    },
                    child: AnimatedContainer(
                      duration: Duration(milliseconds: 200),
                      padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                      decoration: BoxDecoration(
                        color: Color(0xFF4A776D), // Green background color
                        borderRadius: BorderRadius.circular(50),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black26,
                            offset: Offset(0, 4),
                            blurRadius: 10,
                          ),
                        ],
                      ),
                      child: Text(
                        'Become a Founding Member',
                        style: TextStyle(
                          color: Color(0xFFF6F7F6), // White text color
                          fontSize: isMobile ? 16 : 18, // Adjust font size for mobile
                          fontFamily: 'Helvetica',
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),




            // Third Section with Title and Drop-down Menus
            Container(
              color: Colors.white, // White background color
              padding: EdgeInsets.symmetric(vertical: 100, horizontal: isMobile ? 20 : 80),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: 781,
                    child: Text(
                      'Sway Club Membership Includes',
                      style: TextStyle(
                        color: Color(0xFF113D33),
                        fontSize: isMobile ? 35 : 50, // Adjusted for mobile
                        fontFamily: 'Vance-Text',
                        fontWeight: FontWeight.w400,
                        height: 1.2,
                      ),
                    ),
                  ),
                  SizedBox(height: 50), // Increased space between title and dropdown menus

                  // Dropdowns
                  _buildDropdownMenu(0, 'Preferred Pricing', '''
                    Your price: \$99 (per treatment per month)\nTheir price: \$139 (per treatment)\nUnlimited treatments at \$99 each (excluding boosts)
                  '''),

                  _buildDropdownMenu(1, 'Access to Exclusive Member-Only Lounge', '''
                    A private mezzanine for you to relax.\nComplimentary tea and snacks that will make you feel healthy and revitalized.
                  '''),

                  _buildDropdownMenu(2, 'Bring your Bestie', '''
                    What’s better than a wellness day with your bestie?\nWhen you’re a member, you’ll be able to bring a friend for \$99/treatment. Limited to 1x a month.
                  '''),

                  _buildDropdownMenu(3, 'Family Share Account', '''
                    Your Fam = Our Fam. \nYour family can use your membership credits
                  '''),

                  _buildDropdownMenu(4, '10% off at The Sway Shop', '''
                    You can’t pass by our Sway Shop every visit and not get a discount! \nOur shop carries premium brands including Eminence, Dr. Dennis Gross, Knesko, DedCool, Assouline, Gray Malin, and more. 
                  '''),

                  _buildDropdownMenu(5, 'Access to Member Only Events', '''
                    Come together with like-minded friends to create community.\nTogether we’ll inspire wellness.
                  '''),

                   _buildDropdownMenu(6, 'Benefits Roll Over!', '''
                    If you don’t use it, you don’t lose it. Lucky you :) 
                  ''', nestedDropdown: _buildNestedMenu('Terms and Conditions', '''
                    \nMembership cancellation must be a 30-day advance written notification. The minimum, \nnon-cancellable, term of membership is three (3) months. For more details and \nquestions, please call our Wellness Coordinator team.
                  ''')),




                  Align(
                    alignment: Alignment.centerRight,
                    child: ElevatedButton(
                      onPressed: () async {
                        const url = 'https://clients.mindbodyonline.com/classic/ws?studioid=5739770&stype=40&prodid=100';
                        if (await canLaunch(url)) {
                          await launch(url);
                        } else {
                          throw 'Could not launch $url';
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF4A776D),
                        padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50),
                        ),
                      ),
                      child: Text(
                        'Join Now',
                        style: TextStyle(
                          color: Color(0xFFF6F7F6), // White text color
                          fontSize: 18,
                          fontFamily: 'Helvetica',
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Footer
            isMobile ? FooterMobile() : Footer(),
          ],
        ),
      ),
    );
  }

  Widget _buildDropdownMenu(int index, String title, String content, {Widget? nestedDropdown}) {
    bool isOpen = _openedIndex == index;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ListTile(
          title: Text(
            title,
            style: TextStyle(
              color: Color(0xFF4A776D),
              fontSize: 20, // Smaller font size
              fontFamily: 'Vance-Text',
              fontWeight: FontWeight.w400,
            ),
          ),
          trailing: Icon(
            isOpen ? Icons.arrow_drop_up : Icons.arrow_drop_down,
            color: Color(0xFF4A776D),
          ),
          onTap: () {
            setState(() {
              _openedIndex = isOpen ? null : index;
            });
          },
        ),
        if (isOpen)
          Padding(
            padding: EdgeInsets.only(left: 30, right: 10, top: 5, bottom: 5), // Adjusted padding to align with title
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                RichText(
                  text: TextSpan(
                    text: '',
                    style: TextStyle(
                      color: Color(0xFF4A776D),
                      fontSize: 16,
                      fontFamily: 'Vance-Text',
                      height: 1.5, // Add height to make it easier to read
                    ),
                    children: content.trim().split('\n').map((line) {
                      return TextSpan(text: line.trim() + '\n');
                    }).toList(),
                  ),
                  textAlign: TextAlign.left, // Align text to the left
                ),
                SizedBox(height: 10),
                if (nestedDropdown != null) nestedDropdown,
              ],
            ),
          ),
        Container(
          height: 1,
          color: Color(0xFF4A776D),
          margin: EdgeInsets.symmetric(horizontal: 10), // Lines evenly spaced with margins
        ),
        SizedBox(height: 20), // Space between dropdowns
      ],
    );
  }

   Widget _buildNestedMenu(String title, String content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ListTile(
          title: Text(
            title,
            style: TextStyle(
              color: Color(0xFF4A776D),
              fontSize: 18,
              fontFamily: 'Vance-Text',
              fontWeight: FontWeight.w400,
            ),
          ),
          trailing: Icon(
            _isNestedOpen ? Icons.arrow_drop_up : Icons.arrow_drop_down,
            color: Color(0xFF4A776D),
          ),
          onTap: () {
            setState(() {
              _isNestedOpen = !_isNestedOpen; // Toggle the nested menu
            });
          },
        ),
        if (_isNestedOpen)
          Padding(
            padding: EdgeInsets.only(left: 20, top: 5, bottom: 5),
            child: Text(
              content,
              style: TextStyle(
                color: Color(0xFF4A776D),
                fontSize: 16,
                fontFamily: 'Vance-Text',
                height: 1.5,
                ),
            ),
          ),
      ],
    );
  }



}

