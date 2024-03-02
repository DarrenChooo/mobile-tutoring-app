import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    Button,
    KeyboardAvoidingView,
    Dimensions,
    Linking,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProgressCircle from 'react-native-progress-circle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import Stars from 'react-native-stars';
import { RadioButton } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

const image = {uri: 'https://i.ibb.co/8Y38mMw/background.png'};

const STORAGE_KEY_EMAIL = '@save_email'
const STORAGE_KEY_PASSWORD = '@save_password'
const STORAGE_KEY_DATA = '@save_data'


const loginPage = ({navigation}) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const saveData = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY_EMAIL, email)
            await AsyncStorage.setItem(STORAGE_KEY_PASSWORD, password)
            
            alert('Data successfully saved')
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }
    
    const readData = async () => {
        try {
            const userEmail = await AsyncStorage.getItem(STORAGE_KEY_EMAIL)
            const userPassword = await AsyncStorage.getItem(STORAGE_KEY_PASSWORD)
            
        if (userEmail !== null) {
            setEmail(userEmail)
        }
        
        if (userPassword !== null) {
            setPassword(userPassword)
        }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }
        
    useEffect(() => {
        readData()
    }, [])
    
    const onChangeTextEmail = userEmail => setEmail(userEmail)
    const onChangeTextPassword = userPassword => setPassword(userPassword)
    
    const onSubmitEditing = () => {
        if (!email && !password) return
            saveData(email, password)
    }

    checkInput = () => {
        if (email === '' || password === '') {
            alert('Please enter a valid email and password')
        }
        else {
            navigation.navigate('home')
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ImageBackground source={image} style={styles.background}>
            <View style={styles.detailsContainer}>
            <Image source={require('./images/logo.png')} style={styles.logo} />

            <Text style={styles.email}>School Email</Text>
            <TextInput style={styles.emailInp} value={email} onChangeText={onChangeTextEmail} onSubmitEditing={onSubmitEditing}/>

            <Text style={styles.password}>Password</Text>
            <TextInput style={styles.passwordInp} secureTextEntry={true} value={password} onChangeText={onChangeTextPassword} onSubmitEditing={onSubmitEditing}/>

            <TouchableOpacity>  
                <Text
                style={styles.forgetPW}
                onPress={() =>
                    Linking.openURL('https://account.live.com/password/reset')
                }>
                Forget Password?
                </Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={checkInput}
            style={styles.signInButton}>
            <View style={styles.rect}></View>
            <Text style={styles.signIn}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
            <Text style={styles.acc}>Don't have an account?</Text>
            <TouchableOpacity>
                <Text
                style={styles.signUp}
                onPress={() => Linking.openURL('https://signup.live.com/')}>
                Sign Up
                </Text>
            </TouchableOpacity>
            </View>
        </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const homePage = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Image
                source={require('./images/user.png')}
                style={styles.userIcon}
            />
            </TouchableOpacity>

            <Image
            source={require('./images/logo.png')}
            style={styles.polyTechLogo}
            />

            <Image source={require('./images/sp.png')} style={styles.spLogoHome} />
        </View>

        <View style={styles.page}>
            <View style={styles.quoteSect}>
            <Text style={styles.quoteTitle}>Quote of the Day</Text>
            <View style={styles.quotes}>
                <Image
                source={require('./images/quoteBg1.jpg')}
                style={styles.quotePic}
                />
                <View style={styles.quoteTxt}>
                <Text style={styles.quote}>
                    Today is the opportunity to build the tomorrow you want.{' '}
                </Text>
                <Text style={styles.author}>~ Ken Poirot</Text>
                </View>
            </View>
            </View>

            <View style={styles.modSect}>
            <View style={styles.titles}>
                <Image source={require('./images/book.png')} style={styles.icons} />
                <Text style={styles.titleTxt}>Modules</Text>
            </View>

            <View style={styles.btnContainers}>
                <TouchableOpacity
                onPress={() => navigation.navigate('moduleNotesLocked')}
                style={styles.progBtn}>
                <Image
                    source={require('./images/programmer.png')}
                    style={styles.modIcons}
                />
                <Text style={styles.modName}>Programming</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.networkBtn}>
                <Image
                    source={require('./images/network.png')}
                    style={styles.modIcons}
                />
                <Text style={styles.modName}>Network Technology</Text>
                </TouchableOpacity>
            </View>
            </View>

            <View style={styles.savedSect}>
            <View style={styles.titles}>
                <Image
                source={require('./images/savedRibbon.png')}
                style={styles.icons}
                />
                <Text style={styles.titleTxt}>Saved Notes</Text>
            </View>

            <View style={styles.btnContainers}>
                <TouchableOpacity style={styles.progBtn} onPress={() => navigation.navigate('savedNotes')}>
                <Image
                    source={require('./images/programmer.png')}
                    style={styles.modIcons}
                />
                <Text style={styles.modName}>Programming</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.networkBtn}>
                <Image
                    source={require('./images/network.png')}
                    style={styles.modIcons}
                />
                <Text style={styles.modName}>Network Technology</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </View>
    );
};

const profilePage = ({navigation}) => {
    return (
        <View style={styles.container}>

            <View style={styles.header1}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image
                    source={require('./images/arrow.png')}
                    style={styles.arrowImg}
                />
                </TouchableOpacity>
            </View>
            
            <View style={styles.page}>
                <View style={styles.iconBg}>
                    <Image source={require('./images/user.png')} style={styles.userIcon1} />
                    <TouchableOpacity>
                        <Image source={require('./images/add-image.png')} style={styles.addImgIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.particulars}>
                    <Text style={styles.name}>Darren Choo Jun Heng</Text>
                    <Text style={styles.school}>Singapore Polytechnic</Text>
                </View>


                <View style={styles.repScore}>

                    <View style={styles.repTitle}>
                        <Image source={require('./images/rep.png')} style={styles.repScoreIcon} />
                        <Text style={styles.rep}>Reputation Score</Text>
                    </View>

                    <View style={styles.repProgress}>
                        <ProgressCircle
                            percent={80}
                            radius={80}
                            borderWidth={20}
                            color="#FFDD9D"
                            shadowColor="#999"
                            bgColor="#B8D1FF"
                        >
                            <Text style={styles.repPercent}>{'80%'}</Text>
                        </ProgressCircle>
                    </View>
                </View>


                <View style={styles.buttons}>
                    <View style={styles.btnContainer1}>
                        <TouchableOpacity style={styles.abtButton} onPress={() => navigation.navigate('about')}>
                            <Image source={require('./images/aboutIcon.png')} style={styles.aboutIcon} />
                            <Text style={styles.abtText}>About</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnContainer1}>
                        <TouchableOpacity style={styles.fbButton} onPress={() => navigation.navigate('feedback')}>
                            <Image source={require('./images/feedback.png')} style={styles.feedbackIcon} />
                            <Text style={styles.fbText}>Feedback</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btnContainer1}>
                        <TouchableOpacity style={styles.logOutButton}>
                            <Text style={styles.logOutText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const aboutPage = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.header1}>
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Image
                source={require('./images/arrow.png')}
                style={styles.arrowImg}
            />
            </TouchableOpacity>

            <Image
            source={require('./images/aboutIcon.png')}
            style={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>About Us</Text>
        </View>

        <View style={styles.page}>
            <View style={styles.logoSect}>
            <Image source={require('./images/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.contentSect}>
            <View style={styles.missionSect}>
                <Text style={styles.missionTitle}>Our Mission</Text>
                <Text style={styles.missionpara}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </View>

            <View style={styles.teamSect}>
                <Text style={styles.teamTitle}>Our Team</Text>

                <View style={styles.picSect}>
                <View style={styles.photoBg1}>
                    <Image
                    source={require('./images/darrenPic2.jpg')}
                    style={styles.darrenPic}
                    />
                    <Text style={styles.name1}>Darren Choo Jun Heng</Text>
                </View>

                <View style={styles.photoBg2}>
                    <Image
                    source={require('./images/windyPic.jpg')}
                    style={styles.windyPic}
                    />
                    <Text style={styles.name2}>Windy Heng Hui Yi</Text>
                </View>
                </View>
            </View>
            </View>
        </View>
        </View>
    );
};

const feedbackPage = ({navigation}) => {
    const [checked, setChecked] = React.useState('first');

    return (
        <KeyboardAwareScrollView>
        <View style={styles.container1}>

            <View style={styles.header1}>
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <Image source={require('./images/arrow.png')} style={styles.arrowImg} />
                </TouchableOpacity>

                <Image source={require('./images/feedback.png')} style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Feedback</Text>
            </View>

            <View style={styles.page}>
                <View style={styles.img}>
                    <Image source={require('./images/feedbackImg.png')} style={styles.feedbackImage} />
                </View>

                <View style={styles.curve}>
                    <View style={styles.curveShadow}>

                    </View>
                </View>

                <View style={styles.rate}>
                    <Text style={styles.rateTitle}>Please rate your experience</Text>
                    <View style={styles.starContainer}>
                        <Stars
                            default={0}
                            count={5}
                            half={true}
                            starSize={35}
                            spacing={10}
                            fullStar={require('./images/starFilled.png')}
                            emptyStar={require('./images/starEmpty.png')}
                            halfStar={require('./images/starHalf.png')}
                        />

                    </View>
                </View>

                <View style={styles.describe}>
                    <Text style={styles.expTitle}>Describe your experience</Text>
                    <TextInput style={styles.expInput} numberOfLines={7} multiline={true}>

                    </TextInput >

                    <View style={styles.aftInp}>
                        <View style={styles.radioBtnSect}>
                            <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                                color="blue"
                            />
                            <Text style={styles.radioOpts}>Bug</Text>
                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                                color="blue"
                            />
                            <Text style={styles.radioOpts}>Suggestions</Text>
                            <RadioButton
                                value="third"
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('third')}
                                color="blue"
                            />
                            <Text style={styles.radioOpts}>Others</Text>
                        </View>

                        <TouchableOpacity style={styles.sendBtnSect} onPress={() => navigation.navigate('home')}>
                            <View style={styles.sendBtn}>
                                <Text style={styles.sendBtnTxt}>Send Feedback</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </KeyboardAwareScrollView >
    )
}

const moduleNotesPageLocked = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.header1}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Image
                source={require('./images/arrow.png')}
                style={styles.arrowImg}
            />
            </TouchableOpacity>

            <Image
            source={require('./images/programmer.png')}
            style={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>Programming</Text>

            <TouchableOpacity>
            <Image
                style={styles.uploadImg}
                source={require('./images/upload.png')}
            />
            </TouchableOpacity>
        </View>

        <View style={styles.bgRect}>
            <View style={styles.labelRect}>
            <Text style={styles.labelText}>Sort By: Reputation Score</Text>
            <Image
                style={styles.dropdownImg}
                source={require('./images/dropdown.png')}
            />
            </View>

            <View style={styles.innerRectContainer}>
            <View style={styles.innerRect}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 1: Javascript Basics</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>98%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect2}>
                <Image style={styles.tpLogo} source={require('./images/tp.png')} />
                <Text style={styles.chapter}>
                PRG Chapter 2: Javascript Basics 2
                </Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>91%</Text>
                <Text style={styles.date}>14/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect3}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 7: Arrow Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect4}>
                <Image style={styles.rpLogo} source={require('./images/rp.png')} />
                <Text style={styles.chapter}>PRG Chapter 3: Arrays</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect5}>
                <Image
                style={styles.nypLogo}
                source={require('./images/nyp.png')}
                />
                <Text style={styles.chapter}>PRG Chapter 6: Classes</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>79%</Text>
                <Text style={styles.date}>24/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect6}>
                <Image style={styles.npLogo} source={require('./images/np.png')} />
                <Text style={styles.chapter}>PRG Chapter 4: Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>74%</Text>
                <Text style={styles.date}>20/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>
            </View>
        </View>

        <View style={styles.overlay}/>

        <View style={styles.popUpContainer}>
            <View style={styles.popUp}>
                <View style={styles.circle1}>
                    <Image style={styles.padlockImg} source = {require('./images/padlock.png')}/>
                </View>
                <Text style={styles.popUpLabel}>You are required to upload at least a set of notes before viewing others notes!</Text>
                
                <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('upload')}>
                    <Text style={styles.uploadBtn}>Upload</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
        </View>
    );
};

const savedNotesPage = ({navigation}) => {
    return (
        <View style={styles.container1}>

        <View style={styles.header1}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Image
                source={require('./images/arrow.png')}
                style={styles.arrowImg}
            />
            </TouchableOpacity>

            <Image
            source={require('./images/savedRibbon.png')}
            style={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>Saved Notes</Text>

        </View>


            <View style={styles.bgRect}>
                <View style={styles.labelContainer}>
                <View style={styles.labelRect1}>
                    <Image style={styles.prgImg1} source = {require('./images/programmer.png')}/>
                    <Text style = {styles.labelText1}>Programming</Text>
                </View>
                </View>

                <View style={styles.innerRectContainer}>
                    <View style={styles.innerRect}>
                        <TouchableOpacity onPress={() => navigation.navigate('dummyNote2')}>
                            <Image style={styles.spLogo} source = {require('./images/sp.png')}/>
                            <Text style = {styles.chapter}>PRG Chapter 1: Javascript Basics</Text>
                            <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                            <Text style = {styles.repScore1}>98%</Text>
                            <Text style = {styles.date}>11/2/21</Text>
                        </TouchableOpacity>
                        

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.innerRect2}>
                        <Image style={styles.tpLogo} source = {require('./images/tp.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 2: Javascript Basics 2</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>91%</Text>
                        <Text style = {styles.date}>14/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect3}>
                        <Image style={styles.spLogo} source = {require('./images/sp.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 7: Arrow Functions</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>88%</Text>
                        <Text style = {styles.date}>11/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect4}>
                        <Image style={styles.rpLogo} source = {require('./images/rp.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 3: Arrays</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>88%</Text>
                        <Text style = {styles.date}>11/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect5}>
                        <Image style={styles.nypLogo} source = {require('./images/nyp.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 6: Classes</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>79%</Text>
                        <Text style = {styles.date}>24/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect6}>
                        <Image style={styles.npLogo} source = {require('./images/np.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 4: Functions</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>74%</Text>
                        <Text style = {styles.date}>20/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const uploadPage = ({navigation}) => {
    return (
        <View style={styles.container}>

            <View style={styles.header1}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image
                    source={require('./images/arrow.png')}
                    style={styles.arrowImg}
                />
                </TouchableOpacity>

                <Image
                source={require('./images/programmer.png')}
                style={styles.headerIcon}
                />
                <Text style={styles.headerTitle}>Programming</Text>

                <TouchableOpacity>
                <Image
                    style={styles.uploadImg}
                    source={require('./images/upload.png')}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.bgRect}>
            <View style={styles.labelRect}>
            <Text style={styles.labelText}>Sort By: Reputation Score</Text>
            <Image
                style={styles.dropdownImg}
                source={require('./images/dropdown.png')}
            />
            </View>

            <View style={styles.innerRectContainer}>
            <View style={styles.innerRect}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 1: Javascript Basics</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>98%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect2}>
                <Image style={styles.tpLogo} source={require('./images/tp.png')} />
                <Text style={styles.chapter}>
                PRG Chapter 2: Javascript Basics 2
                </Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>91%</Text>
                <Text style={styles.date}>14/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect3}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 7: Arrow Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect4}>
                <Image style={styles.rpLogo} source={require('./images/rp.png')} />
                <Text style={styles.chapter}>PRG Chapter 3: Arrays</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect5}>
                <Image
                style={styles.nypLogo}
                source={require('./images/nyp.png')}
                />
                <Text style={styles.chapter}>PRG Chapter 6: Classes</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>79%</Text>
                <Text style={styles.date}>24/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect6}>
                <Image style={styles.npLogo} source={require('./images/np.png')} />
                <Text style={styles.chapter}>PRG Chapter 4: Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>74%</Text>
                <Text style={styles.date}>20/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>
            </View>
        </View>
            
            <View style={styles.overlay}/>

            <View style={styles.popUpContainer}>
                <View style={styles.popUp}>
                    <View style={styles.circle1}>
                        <Image style={styles.padlockImg} source = {require('./images/padlock.png')}/>
                    </View>
                    <Text style={styles.popUpLabel}>You are required to upload at least a set of notes before viewing others notes!</Text>
                    
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Text style={styles.uploadBtn}>Upload</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.overlay2}/>

            <View style={styles.popUp1}>
                <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('uploadFile')}>
                    <Text style={styles.uploadBtn2}>Upload from Files</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('moduleNotesLocked')}>
                    <Text style={styles.cancelBtn2}>Cancel</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const uploadFilePage = ({navigation}) => {
    const [data, setData] = useState('')

    const saveData = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY_DATA, data)
            
            alert('Data successfully saved')
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    const onSubmit= () => {
        if (!data) return
            saveData(data)
    }
    
    const readData = async () => {
        try {
            const userData = await AsyncStorage.getItem(STORAGE_KEY_DATA)
        if (userData !== null) {
            setData(Data)
        }
        
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }
        
    useEffect(() => {
        readData()
    }, [])

    const onChange = userData => setData(userData)

    const [singleFile, setSingleFile] = useState(null);

    const uploadFile = async () => {
      // Check if any file is selected or not
        if (singleFile != null) {

            const data = new FormData();
            data.append('name', singleFile.name);
            data.append('type', singleFile.type);
            data.append('size', singleFile.size);
            data.append('uri', singleFile.uri);
            
            if (data._parts != null) {
                saveData(data)
                console.log(data)
                navigation.navigate('uploadSuccessful')
            }
        } else {
            // If no file selected the show alert
            alert('Please Select A File first');
        }
        };
    
        const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles],
            });
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
            // If user canceled the document selection
            alert('Canceled');
            } else {
            // For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header1}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image
                    source={require('./images/arrow.png')}
                    style={styles.arrowImg}
                />
                </TouchableOpacity>

                <Image
                source={require('./images/programmer.png')}
                style={styles.headerIcon}
                />
                <Text style={styles.headerTitle}>Programming</Text>

                <TouchableOpacity>
                <Image
                    style={styles.uploadImg}
                    source={require('./images/upload.png')}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.bgRect}>
            <View style={styles.labelRect}>
            <Text style={styles.labelText}>Sort By: Reputation Score</Text>
            <Image
                style={styles.dropdownImg}
                source={require('./images/dropdown.png')}
            />
            </View>

            <View style={styles.innerRectContainer}>
            <View style={styles.innerRect}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 1: Javascript Basics</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>98%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect2}>
                <Image style={styles.tpLogo} source={require('./images/tp.png')} />
                <Text style={styles.chapter}>
                PRG Chapter 2: Javascript Basics 2
                </Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>91%</Text>
                <Text style={styles.date}>14/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect3}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 7: Arrow Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect4}>
                <Image style={styles.rpLogo} source={require('./images/rp.png')} />
                <Text style={styles.chapter}>PRG Chapter 3: Arrays</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect5}>
                <Image
                style={styles.nypLogo}
                source={require('./images/nyp.png')}
                />
                <Text style={styles.chapter}>PRG Chapter 6: Classes</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>79%</Text>
                <Text style={styles.date}>24/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect6}>
                <Image style={styles.npLogo} source={require('./images/np.png')} />
                <Text style={styles.chapter}>PRG Chapter 4: Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>74%</Text>
                <Text style={styles.date}>20/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>
            </View>
        </View>

        <View style={styles.overlay}/>

        <View style={styles.popUpContainer}>
        <View style={styles.popUp2}>
            <Text style={styles.popUpLabel1}>Upload Notes</Text>

            <View style={styles.fileContainer}>
                <Image style={styles.file} source = {require('./images/files.png')}/>
                <TouchableOpacity onPress={selectFile} onChange={onChange}>
                    {singleFile == null ? (
                        <Text style={styles.fileText}>Select File</Text>      
                    ): null}
                    {singleFile != null ? (
                            <Text style={styles.fileText1}>
                            File Name: {singleFile.name ? singleFile.name : ''}
                            </Text>
                    ) : null}
                </TouchableOpacity>
            </View>

            <View style={styles.chapterContainer}>
                <View style={styles.chapterChoose}>
                    <Text style={styles.chosenChapter}>Choose Chapter :</Text>
                    <TouchableOpacity>
                        <Text style={styles.chosenChapterChoose}>Chapter 2: Javascript ...</Text>
                    </TouchableOpacity>
                    <Image style={styles.dropdownChapter} source = {require('./images/dropdown.png')}/>
                </View>

                <SafeAreaView>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.chapters}>
                            <TouchableOpacity>
                                <Text style={styles.chaptersText}>Chapter 1: Javascript Basics</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.chaptersText}>Chapter 2: Javascript Basics 2</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.chaptersText}>Chapter 3: Arrays</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.chaptersText}>Chapter 4: Functions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.chaptersText}>Chapter 5: Objects</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.chaptersText}>Chapter 6: Classes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.chaptersText}>Chapter 7: Arrow Functions</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>

            <View style={styles.buttonContainer2}>
                <View style={styles.buttonContainer1}>
                    <TouchableOpacity onPress={() => navigation.navigate('upload')}>
                        <Text style={styles.cancelBtn}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={uploadFile} onChange={onSubmit}>
                        <Text style={styles.submitBtn}>Submit</Text>
                    </TouchableOpacity>
                </View> 
            </View>

            </View>
        </View>
    </View>
    );
}

const uploadSuccessful = ({navigation}) => {
    setTimeout (() => {
        navigation.navigate('home2')
    }, 2000)

    return (
        <View style={styles.container}>
            <View style={styles.header1}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image
                    source={require('./images/arrow.png')}
                    style={styles.arrowImg}
                />
                </TouchableOpacity>

                <Image
                source={require('./images/programmer.png')}
                style={styles.headerIcon}
                />
                <Text style={styles.headerTitle}>Programming</Text>
            </View>

            <View style={styles.bgRect}>
            <View style={styles.labelRect}>
            <Text style={styles.labelText}>Sort By: Reputation Score</Text>
            <Image
                style={styles.dropdownImg}
                source={require('./images/dropdown.png')}
            />
            </View>

            <View style={styles.innerRectContainer}>
            <View style={styles.innerRect}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 1: Javascript Basics</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>98%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect2}>
                <Image style={styles.tpLogo} source={require('./images/tp.png')} />
                <Text style={styles.chapter}>
                PRG Chapter 2: Javascript Basics 2
                </Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>91%</Text>
                <Text style={styles.date}>14/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect3}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 7: Arrow Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect4}>
                <Image style={styles.rpLogo} source={require('./images/rp.png')} />
                <Text style={styles.chapter}>PRG Chapter 3: Arrays</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect5}>
                <Image
                style={styles.nypLogo}
                source={require('./images/nyp.png')}
                />
                <Text style={styles.chapter}>PRG Chapter 6: Classes</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>79%</Text>
                <Text style={styles.date}>24/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>

            <View style={styles.innerRect6}>
                <Image style={styles.npLogo} source={require('./images/np.png')} />
                <Text style={styles.chapter}>PRG Chapter 4: Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>74%</Text>
                <Text style={styles.date}>20/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </View>
            </View>
        </View>

            <View style={styles.overlay}/>

            <View style={styles.popUpContainer}>
                <View style={styles.popUp}>
                    <View style={styles.circle2}>
                        <Image style={styles.smileImg} source = {require('./images/smile.png')}/>
                    </View>
                    <Text style={styles.text1}>Your upload is successful!</Text>
                    <Text style={styles.text2}>Thank you for your contribution</Text>
                </View>
            </View>
        </View>
    );
}

const homePage2 = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Image
                source={require('./images/user.png')}
                style={styles.userIcon}
            />
            </TouchableOpacity>

            <Image
            source={require('./images/logo.png')}
            style={styles.polyTechLogo}
            />

            <Image source={require('./images/sp.png')} style={styles.spLogoHome} />
        </View>

        <View style={styles.page}>
            <View style={styles.quoteSect}>
            <Text style={styles.quoteTitle}>Quote of the Day</Text>
            <View style={styles.quotes}>
                <Image
                source={require('./images/quoteBg1.jpg')}
                style={styles.quotePic}
                />
                <View style={styles.quoteTxt}>
                <Text style={styles.quote}>
                    Today is the opportunity to build the tomorrow you want.{' '}
                </Text>
                <Text style={styles.author}>~ Ken Poirot</Text>
                </View>
            </View>
            </View>

            <View style={styles.modSect}>
            <View style={styles.titles}>
                <Image source={require('./images/book.png')} style={styles.icons} />
                <Text style={styles.titleTxt}>Modules</Text>
            </View>

            <View style={styles.btnContainers}>
                <TouchableOpacity
                onPress={() => navigation.navigate('moduleNotes')}
                style={styles.progBtn}>
                <Image
                    source={require('./images/programmer.png')}
                    style={styles.modIcons}
                />
                <Text style={styles.modName}>Programming</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.networkBtn}>
                <Image
                    source={require('./images/network.png')}
                    style={styles.modIcons}
                />
                <Text style={styles.modName}>Network Technology</Text>
                </TouchableOpacity>
            </View>
            </View>

            <View style={styles.savedSect}>
            <View style={styles.titles}>
                <Image
                source={require('./images/savedRibbon.png')}
                style={styles.icons}
                />
                <Text style={styles.titleTxt}>Saved Notes</Text>
            </View>

            <View style={styles.btnContainers}>
                <TouchableOpacity style={styles.progBtn} onPress={() => navigation.navigate('savedNotes')}>
                <Image
                    source={require('./images/programmer.png')}
                    style={styles.modIcons}
                />
                <Text style={styles.modName}>Programming</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.networkBtn}>
                <Image
                    source={require('./images/network.png')}
                    style={styles.modIcons}
                />
                <Text style={styles.modName}>Network Technology</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </View>
    );
};

const moduleNotesPage = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.header1}>
            <TouchableOpacity onPress={() => navigation.navigate('home2')}>
            <Image
                source={require('./images/arrow.png')}
                style={styles.arrowImg}
            />
            </TouchableOpacity>

            <Image
            source={require('./images/programmer.png')}
            style={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>Programming</Text>

            <TouchableOpacity onPress={() => navigation.navigate('uploadFile')}>
            <Image
                style={styles.uploadImg}
                source={require('./images/upload.png')}
            />
            </TouchableOpacity>
        </View>

        <View style={styles.bgRect}>
            <View style={styles.labelRect}>
            <Text style={styles.labelText}>Sort By: Reputation Score</Text>
            <TouchableOpacity onPress={() => navigation.navigate('dropDown')}>
                <Image
                    style={styles.dropdownImg2}
                    source={require('./images/dropdown.png')}
                />
            </TouchableOpacity>

            </View>

            <View style={styles.innerRectContainer}>
            <TouchableOpacity style={styles.innerRect}  onPress={() => navigation.navigate('dummyNote')}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 1: Javascript Basics</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>98%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect2}>
                <Image style={styles.tpLogo} source={require('./images/tp.png')} />
                <Text style={styles.chapter}>
                PRG Chapter 2: Javascript Basics 2
                </Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>91%</Text>
                <Text style={styles.date}>14/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect3}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 7: Arrow Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect4}>
                <Image style={styles.rpLogo} source={require('./images/rp.png')} />
                <Text style={styles.chapter}>PRG Chapter 3: Arrays</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect5}>
                <Image
                style={styles.nypLogo}
                source={require('./images/nyp.png')}
                />
                <Text style={styles.chapter}>PRG Chapter 6: Classes</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>79%</Text>
                <Text style={styles.date}>24/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect6}>
                <Image style={styles.npLogo} source={require('./images/np.png')} />
                <Text style={styles.chapter}>PRG Chapter 4: Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>74%</Text>
                <Text style={styles.date}>20/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>
            </View>
        </View>

        </View>

    
    );
};

const dropDownOverlay = ({navigation}) => {
    setTimeout (() => {
        navigation.navigate('moduleNotes')
    }, 1500)

    return (
        <View style={styles.container}>
        <View style={styles.header1}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Image
                source={require('./images/arrow.png')}
                style={styles.arrowImg}
            />
            </TouchableOpacity>

            <Image
            source={require('./images/programmer.png')}
            style={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>Programming</Text>

            <TouchableOpacity>
            <Image
                style={styles.uploadImg}
                source={require('./images/upload.png')}
            />
            </TouchableOpacity>
        </View>

        <View style={styles.bgRect}>
            <View style={styles.labelRect}>
            <Text style={styles.labelText}>Sort By: Reputation Score</Text>
            <TouchableOpacity onPress={() => navigation.navigate('dropDown')}>
                <Image
                    style={styles.dropdownImg2}
                    source={require('./images/dropdown.png')}
                />
            </TouchableOpacity>

            </View>

            <View style={styles.innerRectContainer}>
            <TouchableOpacity style={styles.innerRect}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 1: Javascript Basics</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>98%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect2}>
                <Image style={styles.tpLogo} source={require('./images/tp.png')} />
                <Text style={styles.chapter}>
                PRG Chapter 2: Javascript Basics 2
                </Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>91%</Text>
                <Text style={styles.date}>14/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect3}>
                <Image style={styles.spLogo} source={require('./images/sp.png')} />
                <Text style={styles.chapter}>PRG Chapter 7: Arrow Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect4}>
                <Image style={styles.rpLogo} source={require('./images/rp.png')} />
                <Text style={styles.chapter}>PRG Chapter 3: Arrays</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>88%</Text>
                <Text style={styles.date}>11/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect5}>
                <Image
                style={styles.nypLogo}
                source={require('./images/nyp.png')}
                />
                <Text style={styles.chapter}>PRG Chapter 6: Classes</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>79%</Text>
                <Text style={styles.date}>24/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.innerRect6}>
                <Image style={styles.npLogo} source={require('./images/np.png')} />
                <Text style={styles.chapter}>PRG Chapter 4: Functions</Text>
                <Image
                style={styles.repScoreImg}
                source={require('./images/rep.png')}
                />
                <Text style={styles.repScore1}>74%</Text>
                <Text style={styles.date}>20/2/21</Text>

                <View style={styles.circle}>
                <Image
                    style={styles.saveImg}
                    source={require('./images/saveRibbon.png')}
                />
                </View>
            </TouchableOpacity>
            </View>
        </View>

        <View style = {styles.overlay}></View>

        <View style={styles.labelRect2}>
                <Text style = {styles.labelText2}>Sort By: Reputation Score</Text>
                <Image style={styles.dropdownImg1} source = {require('./images/dropdown.png')}/>
        </View>
        <View style = {styles.sortRect}>
            <Text style = {styles.sortText}>Chapters</Text>
        </View>
        <View style = {styles.sortRect2}>
            <Text style = {styles.sortText}>Schools</Text>
        </View>
        <View style = {styles.sortRect3}>
            <Text style = {styles.sortText}>Latest Upload</Text>
        </View>
        <View style = {styles.sortRect4}>
            <Text style = {styles.sortText}>Newest Upload</Text>
        </View>
    </View>
    );
};

const dummyNote = ({navigation}) => {
    const showAlert = () =>
        alert(
            "Feedback Received"
        )

    return (
        <View style={styles.container}>
            <View style={styles.header1}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image
                    source={require('./images/arrow.png')}
                    style={styles.arrowImg}
                />
                </TouchableOpacity>

                <Image
                source={require('./images/programmer.png')}
                style={styles.headerIcon}
                />
                <Text style={styles.headerTitle}>Programming</Text>

                <TouchableOpacity onPress={() => navigation.navigate('report')}>
                <Image
                    style={styles.reportImg}
                    source={require('./images/report.png')}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.labelRect3}>
                <Image style={styles.prgImg2} source = {require('./images/programmer.png')}/>
                <Text style = {styles.label}>PRG Chapter 2: Javascript Basics 2</Text>
                <Text style = {styles.post}>Posted on: 14/2/21</Text>
                
                <Image style={styles.repScoreImg1} source = {require('./images/rep.png')}/>
                <Text style = {styles.percentage}>91%</Text>

                <Image style={styles.logoImg} source = {require('./images/sp.png')}/>
                <Image style={styles.saveImg1} source = {require('./images/saveRibbon.png')}/>
            </View>

            <View style={styles.contentBG}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.contentContainer}>
                        <Text style = {styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. Morbi non vehicula diam. 
                        Sed vestibulum vitae ante in fringilla. Suspendisse et tempus dolor. Morbi non vehicula diam. 
                        </Text>

                        <View style={styles.content2Container}>
                        <Text style = {styles.content2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. 
                        </Text>
                        <Image style={styles.pieChart} source = {require('./images/piechart.png')}/>
                        </View>

                        <Text style = {styles.content3}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula.Maecenas a vehicula orci. 
                        Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. 
                        </Text>
                        </View>

                        <View style={styles.rateRect}>
                        <View style={styles.rateBG}>
                            <Text style = {styles.rateText}>Rate this document:</Text>

                            <View style = {styles.stars}>

                            <Stars
                                default={0}
                                count={5}
                                half={true}
                                starSize={35}
                                spacing={10}
                                fullStar={require('./images/starFilled.png')}
                                emptyStar={require('./images/starEmpty.png')}
                                halfStar={require('./images/starHalf.png')}
                            />
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity onPress={showAlert}>
                                <Text style={styles.rateButton}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        </View>  
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}

const reportOverlay = ({navigation}) => {
    const [checked, setChecked] = React.useState('first');

        return (
            <View style={styles.container}>
                <View style={styles.header1}>
                    <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Image
                        source={require('./images/arrow.png')}
                        style={styles.arrowImg}
                    />
                    </TouchableOpacity>

                    <Image
                    source={require('./images/programmer.png')}
                    style={styles.headerIcon}
                    />
                    <Text style={styles.headerTitle}>Programming</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('report')}>
                    <Image
                        style={styles.reportImg}
                        source={require('./images/report.png')}
                    />
                    </TouchableOpacity>
                </View>

                <View style={styles.labelRect3}>
                    <Image style={styles.prgImg2} source = {require('./images/programmer.png')}/>
                    <Text style = {styles.label}>PRG Chapter 2: Javascript Basics 2</Text>
                    <Text style = {styles.post}>Posted on: 14/2/21</Text>
                    
                    <Image style={styles.repScoreImg1} source = {require('./images/rep.png')}/>
                    <Text style = {styles.percentage}>91%</Text>

                    <Image style={styles.logoImg} source = {require('./images/sp.png')}/>
                    <Image style={styles.saveImg1} source = {require('./images/saveRibbon.png')}/>
                </View>

                <View style={styles.contentBG}>
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.contentContainer}>
                            <Text style = {styles.content}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. Morbi non vehicula diam. 
                            Sed vestibulum vitae ante in fringilla. Suspendisse et tempus dolor. Morbi non vehicula diam. 
                            </Text>

                            <View style={styles.content2Container}>
                            <Text style = {styles.content2}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. 
                            </Text>
                            <Image style={styles.pieChart} source = {require('./images/piechart.png')}/>
                            </View>

                            <Text style = {styles.content3}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula.Maecenas a vehicula orci. 
                            Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. 
                            </Text>
                            </View>

                            <View style={styles.rateRect}>
                            <View style={styles.rateBG}>
                                <Text style = {styles.rateText}>Rate this document:</Text>

                                <View style = {styles.stars}>
                                <Stars
                                    default={0}
                                    count={5}
                                    half={true}
                                    starSize={35}
                                    spacing={10}
                                    fullStar={require('./images/starFilled.png')}
                                    emptyStar={require('./images/starEmpty.png')}
                                    halfStar={require('./images/starHalf.png')}
                                />
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.rateButton}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            </View>  
                        </ScrollView>
                    </SafeAreaView>
                </View>

                    <View style={styles.overlay}/>

                    <View style={styles.popUpContainer}>
                        <View style={styles.popUp}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text3}>What's wrong with this document?</Text>
                            </View>

                            <View style={styles.radioBtnContainer}>
                                <RadioButton
                                value="first"
                                color = "blue"
                                status={ checked === 'first' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('first')}
                                />
                                <Text style={styles.text4}>Inappropriate Content</Text>

                                <RadioButton
                                value="second"
                                color = "blue"
                                status={ checked === 'second' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('second')}
                                />
                                <Text style={styles.text4}>Misleading Content</Text> 

                                <RadioButton
                                value="third"
                                color = "blue"
                                status={ checked === 'third' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('third')}
                                />
                                <Text style={styles.text4}>Copyright Issues</Text> 

                                <RadioButton
                                value="fourth"
                                color = "blue"
                                status={ checked === 'fourth' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('fourth')}
                                />
                                <Text style={styles.text4}>Others</Text>

                                <TextInput style={styles.othersInp}
                                placeholder='Type here...' 
                                >
                                </TextInput>
                            </View>

                            <View style={styles.buttonContainer3}>
                                <View style={styles.buttonContainer1}>
                                    <TouchableOpacity onPress={() => navigation.navigate('dummyNote')}>
                                        <Text style={styles.cancelBtn}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('reportFeedback')}>
                                        <Text style={styles.submitBtn}>Submit</Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                        </View>
                    </View>
            </View>
        );
}

const reportOverlayFeedback = ({navigation}) => {
    setTimeout (() => {
        navigation.navigate('dummyNote')
    }, 1500)

        return (
            <View style={styles.container}>
                <View style={styles.header1}>
                    <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Image
                        source={require('./images/arrow.png')}
                        style={styles.arrowImg}
                    />
                    </TouchableOpacity>

                    <Image
                    source={require('./images/programmer.png')}
                    style={styles.headerIcon}
                    />
                    <Text style={styles.headerTitle}>Programming</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('report')}>
                    <Image
                        style={styles.reportImg}
                        source={require('./images/report.png')}
                    />
                    </TouchableOpacity>
                </View>

                <View style={styles.labelRect3}>
                    <Image style={styles.prgImg2} source = {require('./images/programmer.png')}/>
                    <Text style = {styles.label}>PRG Chapter 2: Javascript Basics 2</Text>
                    <Text style = {styles.post}>Posted on: 14/2/21</Text>
                    
                    <Image style={styles.repScoreImg1} source = {require('./images/rep.png')}/>
                    <Text style = {styles.percentage}>91%</Text>

                    <Image style={styles.logoImg} source = {require('./images/sp.png')}/>
                    <Image style={styles.saveImg1} source = {require('./images/saveRibbon.png')}/>
                </View>

                <View style={styles.contentBG}>
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.contentContainer}>
                            <Text style = {styles.content}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. Morbi non vehicula diam. 
                            Sed vestibulum vitae ante in fringilla. Suspendisse et tempus dolor. Morbi non vehicula diam. 
                            </Text>

                            <View style={styles.content2Container}>
                            <Text style = {styles.content2}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. 
                            </Text>
                            <Image style={styles.pieChart} source = {require('./images/piechart.png')}/>
                            </View>

                            <Text style = {styles.content3}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula.Maecenas a vehicula orci. 
                            Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. 
                            </Text>
                            </View>

                            <View style={styles.rateRect}>
                            <View style={styles.rateBG}>
                                <Text style = {styles.rateText}>Rate this document:</Text>

                                <View style = {styles.stars}>
                                <Stars
                                    default={0}
                                    count={5}
                                    half={true}
                                    starSize={35}
                                    spacing={10}
                                    fullStar={require('./images/starFilled.png')}
                                    emptyStar={require('./images/starEmpty.png')}
                                    halfStar={require('./images/starHalf.png')}
                                />
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.rateButton}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            </View>  
                        </ScrollView>
                    </SafeAreaView>
                </View>

                <View style={styles.overlay}/>

                <View style={styles.popUpContainer}>
                    <View style={styles.popUp}>
                        <View style={styles.circle2}>
                            <Image style={styles.smileImg} source = {require('./images/smile.png')}/>
                        </View>
                        <Text style={styles.text1}>Your report is successful!</Text>
                        <Text style={styles.text2}>Thank you for your contribution</Text>
                    </View>
                </View>
        </View>
        );
}

const dummyNote2 = ({navigation}) => {
    const showAlert = () =>
        alert(
            "Feedback Received"
        )

    return (
        <View style={styles.container}>
            <View style={styles.header1}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image
                    source={require('./images/arrow.png')}
                    style={styles.arrowImg}
                />
                </TouchableOpacity>

                <Image
                source={require('./images/savedRibbon.png')}
                style={styles.headerIcon}
                />
                <Text style={styles.headerTitle}>Saved Notes</Text>

                <TouchableOpacity onPress={() => navigation.navigate('report2')}>
                <Image
                    style={styles.reportImg}
                    source={require('./images/report.png')}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.labelRect3}>
                <Image style={styles.prgImg2} source = {require('./images/programmer.png')}/>
                <Text style = {styles.label}>PRG Chapter 2: Javascript Basics 2</Text>
                <Text style = {styles.post}>Posted on: 14/2/21</Text>
                
                <Image style={styles.repScoreImg1} source = {require('./images/rep.png')}/>
                <Text style = {styles.percentage}>98%</Text>

                <Image style={styles.logoImg} source = {require('./images/sp.png')}/>
                <TouchableOpacity  onPress={() => navigation.navigate('dummyNoteUnsave')}>
                    <Image style={styles.saveImg2} source = {require('./images/savedRibbon.png')}/>
                </TouchableOpacity>
            </View>

            <View style={styles.contentBG}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.contentContainer}>
                        <Text style = {styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. Morbi non vehicula diam. 
                        Sed vestibulum vitae ante in fringilla. Suspendisse et tempus dolor. Morbi non vehicula diam. 
                        </Text>

                        <View style={styles.content2Container}>
                        <Text style = {styles.content2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. 
                        </Text>
                        <Image style={styles.pieChart} source = {require('./images/piechart.png')}/>
                        </View>

                        <Text style = {styles.content3}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula.Maecenas a vehicula orci. 
                        Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. 
                        </Text>
                        </View>

                        <View style={styles.rateRect}>
                        <View style={styles.rateBG}>
                            <Text style = {styles.rateText}>Rate this document:</Text>

                            <View style = {styles.stars}>

                            <Stars
                                default={0}
                                count={5}
                                half={true}
                                starSize={35}
                                spacing={10}
                                fullStar={require('./images/starFilled.png')}
                                emptyStar={require('./images/starEmpty.png')}
                                halfStar={require('./images/starHalf.png')}
                            />
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity onPress={showAlert}>
                                <Text style={styles.rateButton}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        </View>  
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}

const dummyNoteUnsave = ({navigation}) => {
    const showAlert = () =>
        alert(
            "Feedback Received"
        )

    return (
        <View style={styles.container}>
            <View style={styles.header1}>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image
                    source={require('./images/arrow.png')}
                    style={styles.arrowImg}
                />
                </TouchableOpacity>

                <Image
                source={require('./images/savedRibbon.png')}
                style={styles.headerIcon}
                />
                <Text style={styles.headerTitle}>Saved Notes</Text>

                <TouchableOpacity onPress={() => navigation.navigate('report2')}>
                <Image
                    style={styles.reportImg}
                    source={require('./images/report.png')}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.labelRect3}>
                <Image style={styles.prgImg2} source = {require('./images/programmer.png')}/>
                <Text style = {styles.label}>PRG Chapter 2: Javascript Basics 2</Text>
                <Text style = {styles.post}>Posted on: 14/2/21</Text>
                
                <Image style={styles.repScoreImg1} source = {require('./images/rep.png')}/>
                <Text style = {styles.percentage}>98%</Text>

                <Image style={styles.logoImg} source = {require('./images/sp.png')}/>
                <TouchableOpacity>
                    <Image style={styles.saveImg2} source = {require('./images/savedRibbon.png')}/>
                </TouchableOpacity>
            </View>

            <View style={styles.contentBG}>
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.contentContainer}>
                        <Text style = {styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. Morbi non vehicula diam. 
                        Sed vestibulum vitae ante in fringilla. Suspendisse et tempus dolor. Morbi non vehicula diam. 
                        </Text>

                        <View style={styles.content2Container}>
                        <Text style = {styles.content2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. 
                        </Text>
                        <Image style={styles.pieChart} source = {require('./images/piechart.png')}/>
                        </View>

                        <Text style = {styles.content3}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                        hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula.Maecenas a vehicula orci. 
                        Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                        Duis commodo dignissim lorem luctus. 
                        </Text>
                        </View>

                        <View style={styles.rateRect}>
                        <View style={styles.rateBG}>
                            <Text style = {styles.rateText}>Rate this document:</Text>

                            <View style = {styles.stars}>

                            <Stars
                                default={0}
                                count={5}
                                half={true}
                                starSize={35}
                                spacing={10}
                                fullStar={require('./images/starFilled.png')}
                                emptyStar={require('./images/starEmpty.png')}
                                halfStar={require('./images/starHalf.png')}
                            />
                            </View>
                        </View>

                        <View>
                            <TouchableOpacity onPress={showAlert}>
                                <Text style={styles.rateButton}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        </View>  
                    </ScrollView>
                </SafeAreaView>
            </View>

            <View style={styles.overlay}/>

                <View style={styles.popUpContainer4}>
                    <View style={styles.popUp4}>
                        <Text style={styles.popUpLabel4}>Are you sure you want to unsave this Note?</Text>
                        
                        <View style={styles.buttonContainer}>
                        <View style={styles.buttonContainer1}>
                            <TouchableOpacity onPress={() => navigation.navigate('dummyNote2')}>
                                <Text style={styles.cancelBtn}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('savedNotes2')}>
                                <Text style={styles.submitBtn}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View>
        </View>
    );
}

const savedNotesPage2 = ({navigation}) => {
    return (
        <View style={styles.container1}>

        <View style={styles.header1}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Image
                source={require('./images/arrow.png')}
                style={styles.arrowImg}
            />
            </TouchableOpacity>

            <Image
            source={require('./images/savedRibbon.png')}
            style={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>Saved Notes</Text>

        </View>


            <View style={styles.bgRect}>
                <View style={styles.labelContainer}>
                <View style={styles.labelRect1}>
                    <Image style={styles.prgImg1} source = {require('./images/programmer.png')}/>
                    <Text style = {styles.labelText1}>Programming</Text>
                </View>
                </View>

                <View style={styles.innerRectContainer}>
                    
                    <View style={styles.innerRect2}>
                        <Image style={styles.tpLogo} source = {require('./images/tp.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 2: Javascript Basics 2</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>91%</Text>
                        <Text style = {styles.date}>14/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect3}>
                        <Image style={styles.spLogo} source = {require('./images/sp.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 7: Arrow Functions</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>88%</Text>
                        <Text style = {styles.date}>11/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect4}>
                        <Image style={styles.rpLogo} source = {require('./images/rp.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 3: Arrays</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>88%</Text>
                        <Text style = {styles.date}>11/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect5}>
                        <Image style={styles.nypLogo} source = {require('./images/nyp.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 6: Classes</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>79%</Text>
                        <Text style = {styles.date}>24/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect6}>
                        <Image style={styles.npLogo} source = {require('./images/np.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 4: Functions</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>74%</Text>
                        <Text style = {styles.date}>20/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.innerRect6}>
                        <Image style={styles.npLogo} source = {require('./images/np.png')}/>
                        <Text style = {styles.chapter}>PRG Chapter 7:Arrow Functions</Text>
                        <Image style={styles.repScoreImg} source = {require('./images/rep.png')}/>
                        <Text style = {styles.repScore1}>68%</Text>
                        <Text style = {styles.date}>20/2/21</Text>

                        <TouchableOpacity style = {styles.circle}>
                            <Image style={styles.saveImg} source = {require('./images/savedRibbon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const reportOverlay2 = ({navigation}) => {
    const [checked, setChecked] = React.useState('first');

        return (
            <View style={styles.container}>
                <View style={styles.header1}>
                    <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Image
                        source={require('./images/arrow.png')}
                        style={styles.arrowImg}
                    />
                    </TouchableOpacity>

                    <Image
                    source={require('./images/savedRibbon.png')}
                    style={styles.headerIcon}
                    />
                    <Text style={styles.headerTitle}>Saved Notes</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('report2')}>
                    <Image
                        style={styles.reportImg}
                        source={require('./images/report.png')}
                    />
                    </TouchableOpacity>
                </View>

                <View style={styles.labelRect3}>
                    <Image style={styles.prgImg2} source = {require('./images/programmer.png')}/>
                    <Text style = {styles.label}>PRG Chapter 2: Javascript Basics 2</Text>
                    <Text style = {styles.post}>Posted on: 14/2/21</Text>
                    
                    <Image style={styles.repScoreImg1} source = {require('./images/rep.png')}/>
                    <Text style = {styles.percentage}>91%</Text>

                    <Image style={styles.logoImg} source = {require('./images/sp.png')}/>
                    <Image style={styles.saveImg1} source = {require('./images/saveRibbon.png')}/>
                </View>

                <View style={styles.contentBG}>
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.contentContainer}>
                            <Text style = {styles.content}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. Morbi non vehicula diam. 
                            Sed vestibulum vitae ante in fringilla. Suspendisse et tempus dolor. Morbi non vehicula diam. 
                            </Text>

                            <View style={styles.content2Container}>
                            <Text style = {styles.content2}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. 
                            </Text>
                            <Image style={styles.pieChart} source = {require('./images/piechart.png')}/>
                            </View>

                            <Text style = {styles.content3}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula.Maecenas a vehicula orci. 
                            Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. 
                            </Text>
                            </View>

                            <View style={styles.rateRect}>
                            <View style={styles.rateBG}>
                                <Text style = {styles.rateText}>Rate this document:</Text>

                                <View style = {styles.stars}>
                                <Stars
                                    default={0}
                                    count={5}
                                    half={true}
                                    starSize={35}
                                    spacing={10}
                                    fullStar={require('./images/starFilled.png')}
                                    emptyStar={require('./images/starEmpty.png')}
                                    halfStar={require('./images/starHalf.png')}
                                />
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.rateButton}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            </View>  
                        </ScrollView>
                    </SafeAreaView>
                </View>

                    <View style={styles.overlay}/>

                    <View style={styles.popUpContainer}>
                        <View style={styles.popUp}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text3}>What's wrong with this document?</Text>
                            </View>

                            <View style={styles.radioBtnContainer}>
                                <RadioButton
                                value="first"
                                color = "blue"
                                status={ checked === 'first' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('first')}
                                />
                                <Text style={styles.text4}>Inappropriate Content</Text>

                                <RadioButton
                                value="second"
                                color = "blue"
                                status={ checked === 'second' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('second')}
                                />
                                <Text style={styles.text4}>Misleading Content</Text> 

                                <RadioButton
                                value="third"
                                color = "blue"
                                status={ checked === 'third' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('third')}
                                />
                                <Text style={styles.text4}>Copyright Issues</Text> 

                                <RadioButton
                                value="fourth"
                                color = "blue"
                                status={ checked === 'fourth' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('fourth')}
                                />
                                <Text style={styles.text4}>Others</Text>

                                <TextInput style={styles.othersInp}
                                placeholder='Type here...' 
                                >
                                </TextInput>
                            </View>

                            <View style={styles.buttonContainer3}>
                                <View style={styles.buttonContainer1}>
                                    <TouchableOpacity onPress={() => navigation.navigate('dummyNote2')}>
                                        <Text style={styles.cancelBtn}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('reportFeedback2')}>
                                        <Text style={styles.submitBtn}>Submit</Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                        </View>
                    </View>
            </View>
        );
}

const reportOverlayFeedback2 = ({navigation}) => {
    setTimeout (() => {
        navigation.navigate('dummyNote2')
    }, 1500)

        return (
            <View style={styles.container}>
                <View style={styles.header1}>
                    <TouchableOpacity onPress={() => navigation.navigate('home')}>
                    <Image
                        source={require('./images/arrow.png')}
                        style={styles.arrowImg}
                    />
                    </TouchableOpacity>

                    <Image
                    source={require('./images/savedRibbon.png')}
                    style={styles.headerIcon}
                    />
                    <Text style={styles.headerTitle}>Saved Notes</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('report')}>
                    <Image
                        style={styles.reportImg}
                        source={require('./images/report.png')}
                    />
                    </TouchableOpacity>
                </View>

                <View style={styles.labelRect3}>
                    <Image style={styles.prgImg2} source = {require('./images/programmer.png')}/>
                    <Text style = {styles.label}>PRG Chapter 2: Javascript Basics 2</Text>
                    <Text style = {styles.post}>Posted on: 14/2/21</Text>
                    
                    <Image style={styles.repScoreImg1} source = {require('./images/rep.png')}/>
                    <Text style = {styles.percentage}>91%</Text>

                    <Image style={styles.logoImg} source = {require('./images/sp.png')}/>
                    <Image style={styles.saveImg1} source = {require('./images/saveRibbon.png')}/>
                </View>

                <View style={styles.contentBG}>
                    <SafeAreaView>
                        <ScrollView>
                            <View style={styles.contentContainer}>
                            <Text style = {styles.content}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. Morbi non vehicula diam. 
                            Sed vestibulum vitae ante in fringilla. Suspendisse et tempus dolor. Morbi non vehicula diam. 
                            </Text>

                            <View style={styles.content2Container}>
                            <Text style = {styles.content2}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula. 
                            </Text>
                            <Image style={styles.pieChart} source = {require('./images/piechart.png')}/>
                            </View>

                            <Text style = {styles.content3}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim velit, ultrices sed lacus at, 
                            hendrerit convallis ante. Quisque eu ante nisi. Integer sagittis vel libero vitae vehicula.Maecenas a vehicula orci. 
                            Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. Nullam lorem bibendum tortor ullamcorper, eleifend nibh et, convallis massa. Nulla finibus sodales
                            Duis commodo dignissim lorem luctus. 
                            </Text>
                            </View>

                            <View style={styles.rateRect}>
                            <View style={styles.rateBG}>
                                <Text style = {styles.rateText}>Rate this document:</Text>

                                <View style = {styles.stars}>
                                <Stars
                                    default={0}
                                    count={5}
                                    half={true}
                                    starSize={35}
                                    spacing={10}
                                    fullStar={require('./images/starFilled.png')}
                                    emptyStar={require('./images/starEmpty.png')}
                                    halfStar={require('./images/starHalf.png')}
                                />
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.rateButton}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            </View>  
                        </ScrollView>
                    </SafeAreaView>
                </View>

                <View style={styles.overlay}/>

                <View style={styles.popUpContainer}>
                    <View style={styles.popUp}>
                        <View style={styles.circle2}>
                            <Image style={styles.smileImg} source = {require('./images/smile.png')}/>
                        </View>
                        <Text style={styles.text1}>Your report is successful!</Text>
                        <Text style={styles.text2}>Thank you for your contribution</Text>
                    </View>
                </View>
        </View>
        );
}

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={loginPage} />
            <Stack.Screen name="home" component={homePage} />
            <Stack.Screen name="profile" component={profilePage} />
            <Stack.Screen name="about" component={aboutPage} />
            <Stack.Screen name="feedback" component={feedbackPage} />
            <Stack.Screen name="moduleNotesLocked" component={moduleNotesPageLocked} />
            <Stack.Screen name="moduleNotes" component={moduleNotesPage} />
            <Stack.Screen name="savedNotes" component={savedNotesPage} />
            <Stack.Screen name="upload" component={uploadPage} />
            <Stack.Screen name="uploadSuccessful" component={uploadSuccessful} />
            <Stack.Screen name="uploadFile" component={uploadFilePage} />
            <Stack.Screen name="home2" component={homePage2} />
            <Stack.Screen name="dropDown" component={dropDownOverlay} />
            <Stack.Screen name="dummyNote" component={dummyNote} />
            <Stack.Screen name="report" component={reportOverlay} />
            <Stack.Screen name="reportFeedback" component={reportOverlayFeedback} />
            <Stack.Screen name="dummyNote2" component={dummyNote2} />
            <Stack.Screen name="report2" component={reportOverlay2} />
            <Stack.Screen name="reportFeedback2" component={reportOverlayFeedback2} />
            <Stack.Screen name="dummyNoteUnsave" component={dummyNoteUnsave} />
            <Stack.Screen name="savedNotes2" component={savedNotesPage2} />
        </Stack.Navigator>
        </NavigationContainer>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        paddingHorizontal: '16%',
    },

    detailsContainer: {
        flex: 2,
        marginTop: 200,
    },

    logo: {
        width: 200,
        height: 100,
        alignSelf: 'center',
    },

    email: {
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },

    emailInp: {
        width: 274,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        marginBottom: 20,
    },

    password: {
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },

    passwordInp: {
        width: 274,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
    },

    forgetPW: {
        marginTop: 5,
        alignSelf: 'flex-start',
        color: 'black',
        fontSize: 15,
        textDecorationLine: 'underline',
    },

    signInButton: {
        flex: 1,
        width: 128,
        height: 41,
        justifyContent: 'center',
    },

    rect: {
        width: 127,
        height: 41,
        backgroundColor: '#1F4B9A',
        borderRadius: 10,
        elevation: 15,
    },

    signIn: {
        position: 'absolute',
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        elevation: 16,
    },

    footer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 50,
    },

    acc: {
        marginTop: 2,
        paddingEnd: 25,
        color: 'black',
        fontSize: 15,
    },

    signUp: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    //Home page stylesheet
    container: {
        flex: 1,
        backgroundColor: '#6B9FFF',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        top: 15,
    },
    userIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        left: -30,
        marginTop: 10,
    },
    polyTechLogo: {
        width: 200,
        height: 60,
    },
    spLogoHome: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
        right: -30,
        marginTop: 5,
    },
    page: {
        flex: 7,
        backgroundColor: '#B8D1FF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    quoteSect: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    quoteTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        left: 45,
        top: 25,
    },
    quotePic: {
        flex: 5,
        width: 317,
        height: 140,
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
        position: 'absolute',
    },
    quote: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        width: 250,
        textAlign: 'center',
        zIndex: 10,
        left: 35,
        top: 30,
    },
    author: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        right: 15,
        bottom: 15,
    },
    quoteTxt: {
        flex: 5,
        width: 317,
        height: 140,
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: 'black',
        opacity: 0.7,
        zIndex: 1,
        justifyContent: 'center',
    },
    quotes: {
        flex: 3,
    },
    modSect: {
        flex: 1,
    },
    titles: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 5,
    },
    icons: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        left: 45,
    },
    modIcons: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        left: 10,
        marginTop: 4,
    },
    titleTxt: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        left: 50,
    },
    btnContainers: {
        flex: 5,
        backgroundColor: '#6B9FFF',
        width: 330,
        marginBottom: 15,
        alignSelf: 'center',
        borderRadius: 15,
    },
    savedSect: {
        flex: 1,
    },
    progBtn: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        marginTop: 30,
        marginHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    networkBtn: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        marginVertical: 30,
        marginHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    modName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        left: 20,
        marginTop: 5,
    },

    overlay: {
        flex: 1,
        position: 'absolute',
        opacity: 0.5,
        backgroundColor: 'black',
        width: windowWidth,
        height: windowHeight,
        elevation: 10
    },

    popUpContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight,
    },

    popUp: {
        width: 350,
        height: 400,
        backgroundColor: '#E4EEFF',
        borderRadius: 7,
        elevation: 11,
        alignItems: 'center',
    },

    circle1: {
        flex: 4,
        alignSelf: 'center',
        marginTop: 20,
        width: 180,
        height: 180,
        borderRadius: 200 / 2,
        backgroundColor: "#6B9FFF",
        justifyContent: 'center',
        alignItems: 'center',
    },

    padlockImg: {
        width: 130,
        height: 130,
        resizeMode: 'contain'
    },

    popUpLabel: {
        flex: 2,
        marginTop: 30,
        textAlign: 'center',
        alignSelf: 'center',
        width: 280,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },

    buttonContainer: {
        flex: 2,
        alignItems: 'center',
    },

    uploadBtn: {
        fontSize: 18,
        color: 'black',
        backgroundColor: '#6B9FFF',
        elevation: 5,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 10,
    },

    //Profile page stylesheet
    iconBg: {
        position: 'absolute',
        width: 130,
        height: 130,
        borderRadius: 70,
        backgroundColor: '#6B9FFF',
        alignSelf: 'center',
        bottom: 605,
        shadowColor: "black",
        shadowOpacity: 1.75,
        shadowRadius: 1,
        elevation: 8,
        zIndex: -1
    },
    userIcon1: {
        flex: 2,
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 110
    },
    addImgIcon: {
        position: 'absolute',
        width: 35,
        resizeMode: 'contain',
        left: 100,
        top: -260
    },
    name: {
        flex: 1,
        textAlign: 'center',
        marginTop: 120,
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
    },
    school: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20.5,
        fontWeight: 'bold',
        color: 'black',
    },
    rep: {
        flex: 10,
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    repTitle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    repProgress: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    repPercent: {
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold'
    },
    repScore: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    repScoreIcon: {
        flex: 1,
        width: 45,
        height: 45,
        resizeMode: 'contain',
        marginTop: 5,
        left: 65
    },
    particulars: {
        flex: 1,
    },

    buttons: {
        flex: 1,
    },
    btnContainer1: {
        flex: 1,
        alignItems: 'center',
    },
    abtButton: {
        width: 250,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'column',
        flexWrap: 'wrap',
        shadowColor: "black",
        shadowOpacity: 1.75,
        shadowRadius: 1,
        elevation: 8,
    },
    aboutIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginTop: 5,
        marginLeft: 20,
        justifyContent: 'center'
    },
    abtText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    fbButton: {
        width: 250,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'column',
        flexWrap: 'wrap',
        shadowColor: "black",
        shadowOpacity: 1.75,
        shadowRadius: 1,
        elevation: 8,
        top: -15
    },
    fbText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    feedbackIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 3
    },
    logOutButton: {
        width: 100,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#1F4B9A',
        shadowColor: "black",
        shadowOpacity: 1.75,
        shadowRadius: 1,
        elevation: 8,
        top: -20
    },
    logOutText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 35
    },

    //About page stylesheet
    headerIcon: {
        flex: 1,
        width: 45,
        height: 45,
        resizeMode: 'contain',
        marginTop: 5,
        marginStart: 25,
    },
    headerTitle: {
        flex: 3,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
    missionTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        flex: 2,
        paddingLeft: 30,
    },
    logo: {
        alignSelf: 'center',
        width: 200,
        height: 100,
    },
    missionpara: {
        fontSize: 17,
        fontWeight: 'bold',
        flex: 20,
        paddingHorizontal: 30,
        color: 'black',
        flex: 12,
    },
    teamTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        paddingLeft: 30,
    },
    header1: {
        flex: 1,
        flexDirection: 'row',
        top: 20,
        flexWrap: 'wrap',
    },
    logoSect: {
        flex: 1,
    },
    contentSect: {
        flex: 7,
        justifyContent: 'space-between',
    },
    missionSect: {
        flex: 1,
        top: 10,
    },
    teamSect: {
        flex: 1,
    },
    picSect: {
        flex: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 30,
    },
    photoBg1: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 15,
        paddingBottom: 5,
        borderRadius: 10,
        paddingTop: 5,
    },
    photoBg2: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
    },
    name1: {
        flex: 1,
        flexDirection: 'column',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
    },
    name2: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 3,
    },
    darrenPic: {
        flex: 8,
        flexDirection: 'column',
        resizeMode: 'contain',
        flexWrap: 'wrap',
        left: 4,
        width: '95%',
        top: -5,
        borderRadius: 10,
    },
    windyPic: {
        flex: 10,
        flexDirection: 'column',
        resizeMode: 'contain',
        flexWrap: 'wrap',
        left: 4,
        width: '95%',
        top: -6,
        borderRadius: 10,
    },

    //Feedback page stylesheet
    container1: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#6B9FFF'
    },

    img: {
        flex: 7.5,
        backgroundColor: '#FFDD9D',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    feedbackImage: {
        width: 394,
        height: 213,
        marginTop: 25,
        alignSelf: 'center',
        borderRadius: 70
    },
    curve: {
        width: 205,
        height: 100,
        backgroundColor: "#FFDD9D",
        transform: [{ scaleX: 2.4 }],
        marginLeft: "auto",
        marginRight: "auto",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        zIndex: -5,
    },
    curveShadow: {
        width: 205,
        height: 110,
        transform: [{ scaleX: 1 }],
        marginLeft: "auto",
        marginRight: "auto",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 13,
    },
    rate: {
        flex: 6,
    },
    rateTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        left: 35
    },
    starContainer: {
        flex: 1,
        left: 35,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    describe: {
        flex: 14,
    },
    expTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        left: 35, 
        top: -20
    },
    expInput: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 10,
        width: 332,
        height: 202,
        alignSelf: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, 
        top: -20,
    },
    aftInp: {
        flex: 0.8,
        top: -25
    },
    radioBtnSect: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        marginLeft: 25
    },
    radioBtn: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 5,
    },
    radioOpts: {
        fontWeight: 'bold',
        color: 'black',
        marginRight: 6,
        marginTop: 8
    },
    sendBtnSect: {
        flex: 1,
    },
    sendBtn: {
        width: 175,
        height: 30,
        alignSelf: 'center',
        backgroundColor: '#1F4B9A',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    sendBtnTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 4,
    },

    //Modules note stylesheet
    arrowImg: {
        flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        top: -20,
        marginRight: 15,
        marginLeft: 20,
    },

    uploadImg: {
        flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        top: -20,
        marginRight: 20,
    },

    bgRect: {
        flex: 7,
        flexDirection: 'column',
        alignItems: 'center',
        width: windowWidth,
        height: 726,
        backgroundColor: '#B8D1FF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },

    labelRect: {
        marginTop: 20,
        width: 307,
        height: 38,
        backgroundColor: '#FFDD9D',
    },

    labelText: {
        width: 287,
        height: 25,
        left: 15,
        top: 8,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },

    dropdownImg: {
        width: 25,
        height: 25,
        position: 'absolute',
        left: 260,
        top: 8,
    },

    dropdownImg2: {
        width: 25,
        height: 25,
        left: 260,
        top: -16,
    },

    innerRectContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },

    innerRect: {
        width: 307,
        height: 82,
        backgroundColor: '#6B9FFF',
        borderRadius: 10,
        elevation: 10,
    },

    rpLogo: {
        width: 16,
        height: 20,
        left: 14,
        top: 12,
    },

    spLogo: {
        width: 21,
        height: 13,
        left: 10,
        top: 14,
    },

    tpLogo: {
        width: 21,
        height: 21,
        left: 10,
        top: 12,
    },

    nypLogo: {
        width: 25,
        height: 11,
        left: 8,
        top: 16,
    },

    npLogo: {
        width: 16,
        height: 22,
        left: 14,
        top: 12,
    },

    chapter: {
        position: 'absolute',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        left: 36,
        top: 10,
    },

    repScoreImg: {
        position: 'absolute',
        width: 30,
        height: 30,
        left: 50,
        top: 38,
    },

    repScore1: {
        position: 'absolute',
        color: 'black',
        fontSize: 16,
        left: 85,
        top: 45,
        fontWeight: 'bold',
    },

    date: {
        position: 'absolute',
        color: 'black',
        fontSize: 16,
        left: 155,
        top: 45,
        fontWeight: 'bold',
    },

    circle: {
        position: 'absolute',
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#FFDD9D',
        left: 240,
        top: 40,
    },

    saveImg: {
        width: 20,
        height: 20,
        left: 7,
        top: 7,
    },

    innerRect2: {
        width: 307,
        height: 82,
        backgroundColor: '#6B9FFF',
        borderRadius: 10,
        elevation: 10,
    },

    innerRect3: {
        width: 307,
        height: 82,
        backgroundColor: '#6B9FFF',
        borderRadius: 10,
        elevation: 10,
    },

    innerRect4: {
        width: 307,
        height: 82,
        backgroundColor: '#6B9FFF',
        borderRadius: 10,
        elevation: 10,
    },

    innerRect5: {
        width: 307,
        height: 82,
        backgroundColor: '#6B9FFF',
        borderRadius: 10,
        elevation: 10,
    },

    innerRect6: {
        width: 307,
        height: 82,
        backgroundColor: '#6B9FFF',
        borderRadius: 10,
        elevation: 10,
    },

    //Saved Notes stylesheet
    savedIcon: {
        flex: 1,
        width: 35,
        resizeMode: 'contain',
        marginTop: 5,
    },

    savedText: {
        flex: 3,
        width: 185,
        height: 38,
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
    },

    prgImg1: {
        width: 30,
        height: 30,
        marginTop: 5,
        resizeMode: 'contain'
    },

    labelContainer: {
        marginTop: 20,
        width: 307,
        height: 38,
        backgroundColor: '#FFDD9D',
    },

    labelRect1: {
        marginStart: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    labelText1: {
        flex: 1,
        width: 287,
        height: 25,
        marginTop: 6,
        marginStart: 10,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },

    //Upload Page stylesheet
    overlay2: {
        flex: 1,
        position: 'absolute',
        opacity: 0.3,
        backgroundColor: 'black',
        width: windowWidth,
        height: windowHeight,
        elevation: 11
    },

    popUp1: {
        alignSelf: 'center',
        bottom: 0,
        position: 'absolute',
        elevation: 12,
    },

    uploadBtn2: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#88B2FF',
        backgroundColor: '#282D35',
        alignSelf: 'center',
        borderRadius: 15,
        paddingHorizontal: 100,
        paddingVertical: 15,
        marginBottom: 10,
    },

    cancelBtn2: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF0000',
        backgroundColor: '#282D35',
        alignSelf: 'center',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 153,
        marginBottom: 10,
    },

    btnContainer: {
        elevation:13
    },

    //Upload file stylesheet

    smileImg: {
        width: 152,
        height: 152,
    },
    
    circle2: {
        flex: 2,
        alignSelf: 'center',
        marginTop: 20,
        width: 180,
        height: 120,
        borderRadius: 180 / 2,
        backgroundColor: "#6B9FFF",
        justifyContent: 'center',
        alignItems: 'center',
    },

    text1: {
        flex: 0.7,
        marginTop: 20,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },

    text2: {
        flex: 1.3,
        textAlign: 'center',
        width: 300,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'  
    },

    //File Upload stylesheet
    popUp2: {
        width: 350,
        height: 400,
        backgroundColor: '#E4EEFF',
        borderRadius: 7,
        elevation: 11,
    },

    popUpLabel1: {
        flex: 0.8,
        marginTop: 20,
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },

    fileContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    file: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },

    fileText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'white',
        marginStart: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 5,
    },

    fileText1: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'white',
        marginStart: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 5,
    },

    chapterContainer: {
        flex: 4,
        paddingHorizontal: 12,
    },

    chapterChoose: {
        paddingVertical: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#FFDD9D'
    },

    chosenChapter: {
        marginTop: 2,
        color: 'black',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },

    chosenChapterChoose: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        color: 'black',
    },

    dropdownChapter: {
        width: 25,
        height: 25,
        transform: [
            {scaleY: -1},
        ]
    },

    scrollView: {
        height: 161
    },

    chapters: {
        backgroundColor: 'white',
    },

    chaptersText: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingStart: 15,
        color: 'black',
    },

    buttonContainer2: {
        flex:1,
        alignItems: 'center',
    },

    buttonContainer1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    cancelBtn: {
        marginEnd: 15,
        color: '#FF0000',
        fontWeight: 'bold',
        backgroundColor: '#001D54',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 5,
    },

    submitBtn: {
        marginStart: 15,
        color: '#33FF00',
        fontWeight: 'bold',
        backgroundColor: '#001D54',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 5,
    },

    //DropDown Overlay StyleSheet
    reportImg: {
        flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        top: -10,
        marginRight: 15,
    },

    labelRect2: {
        position: 'absolute',
        top: 116,
        left: 42,
        width: 307,
        height: 38,
        backgroundColor: '#FFDD9D',
    },

    labelText2: {
        width: 287,
        height: 25,
        left: 15,
        top: 8,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },

    dropdownImg1: {
        width: 25,
        height: 25,
        position: "absolute",
        left: 260,
        top: 8,
        transform: [
            {scaleY: -1},
        ]
    },

    sortRect: {
        width: 307,
        height: 30,
        backgroundColor: 'white',
        position: 'absolute',
        top: 154,
        left: 42,
        elevation: 11,
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: 'darkgrey',
    },

    sortRect2: {
        width: 307,
        height: 30,
        backgroundColor: 'white',
        position: 'absolute',
        top: 184,
        left: 42,
        elevation: 11,
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: 'darkgrey',
    },

    sortRect3: {
        width: 307,
        height: 30,
        backgroundColor: 'white',
        position: 'absolute',
        top: 214,
        left: 42,
        elevation: 11,
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: 'darkgrey',
    },

    sortRect4: {
        width: 307,
        height: 30,
        backgroundColor: 'white',
        position: 'absolute',
        top: 244,
        left: 42,
        elevation: 11,
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: 'darkgrey',
    },

    sortText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 3
    },

    //Dummy Note stylesheet

    headingContainer: {
        flex: 1,
        top: 20,
        justifyContent: 'center',
    },

    heading: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    arrowImg: {
        flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        top: -10,
        marginRight: 10,
        marginLeft: 15
    },

    prgImg: {
        flex: 1,
        height: 45,
        resizeMode: 'contain'
    },

    prgText: {
        flex: 3,
        width: 185,
        height: 38,
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
    },

    reportImg: {
        flex: 1,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        top: -10,
        marginRight: 15,
    },
    
    labelRect3: {
        flex: 1,
        top: 35,
        width: windowWidth,
        backgroundColor: '#FFDD9D',
        elevation: 10
    },

    prgImg2: {
        width: 30,
        height: 30,
        top: 15,
        left: 15
    },

    label: {
        position: 'absolute',
        top: 5,
        left: 60,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },

    post: {
        position: 'absolute',
        top: 30,
        left: 60,
        fontSize: 15,
        color: 'black'
    },

    repScoreImg1: {
        position: 'absolute',
        width: 23,
        height: 23,
        top: 28,
        left: 225,
    },

    percentage: {
        position: 'absolute',
        color: 'black',
        top: 30,
        left: 255,
    },

    logoImg: {
        position: 'absolute',
        width: 28,
        height: 17,
        top: 32,
        left: 295
    },

    saveImg1: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 30,
        left: 334
    },

    saveImg2: {
        width: 20,
        height: 20,
        left: 334
    },

    contentBG: {
        marginTop: 30,
        flex: 10,
        backgroundColor: 'white',
    },
    
    contentContainer: {
        paddingHorizontal: 30,
    },

    content: {
        marginTop: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },

    content2Container: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },

    content2: {
        width: 180,
        marginTop: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },

    pieChart: {
        width: 152,
        height: 152,
    },

    content3: {
        marginTop: 20,
        marginBottom: 30,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },

    rateRect: {
        width: windowWidth,
        height: 190,
        backgroundColor: '#B8D1FF',
    },

    rateBG: {
        alignItems:'center',
        left: 50,
        top: 17,
        width: 278,
        height: 95,
        backgroundColor: '#6B9FFF',
        borderRadius: 10,
        elevation: 5,
    },

    rateText: {
        top: 10,
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
    },

    stars: {
        marginTop: 20,
    },

    rateButton: {
        color: 'white',
        alignSelf: 'center',
        backgroundColor: '#001D54',
        fontWeight: 'bold',
        width: 110,
        marginTop: 40,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 32,
    },

    //Report Overlay StyleSheet
    textContainer:{
        flex: 1.3
    },

    text3: {
        marginTop: 20,
        textAlign: 'center',
        width: 300,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },

    radioBtnContainer: {
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginStart: 40,
        marginTop: 10
    },

    text4: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        width: 240,
        marginStart: 4
    },

    othersInp: {
        marginStart: 8,
        width: 240,
        height: 40,
        backgroundColor: "white",
        elevation: 10,
        marginBottom: 20
    },

    buttonContainer3: {
        flex:1,
        alignItems: 'center',
    },

    cancelBtn: {
        marginEnd: 15,
        color: '#FF0000',
        fontWeight: 'bold',
        backgroundColor: '#001D54',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 5,
    },

    submitBtn: {
        marginStart: 15,
        color: '#33FF00',
        fontWeight: 'bold',
        backgroundColor: '#001D54',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 5,
    },

    //Unsave note overlay stylesheet
    popUpContainer4: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight,
    },

    popUp4: {
        width: 350,
        height: 150,
        backgroundColor: '#E4EEFF',
        borderRadius: 7,
        elevation: 11,
        alignItems: 'center',
    },

    popUpLabel4: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20,
        width: 200,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
});

    export default App;
