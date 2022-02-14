/*import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';
import * as yup from 'yup';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import makeStyles from '@material-ui/styles/makeStyles';

import {login} from '../../actions/auth';

const useStyles = makeStyles({
    registerButton: {
        width: '140px',
        height: '42px',
        background: '#2B2322 0% 0% no-repeat padding-box',
        boxShadow: '0px 2px 2px #00000029',
        border: '2px solid #2B2322',
        borderRadius: '4px',
        textAlign: 'center',
        font: 'normal normal bold 16px/25px Nunito',
        letterSpacing: '0.32px',
        color: '#FFFFFF',
        opacity: 1,

        marginLeft: '12px',

        '&:hover':{
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            color: '#2B2322',
        }
    },

    formContainer: {
        padding: '0px 121px 40px 121px',
    },

    formTitle: {
        height: '32px',
        textAlign: 'left',
        font: 'normal bold 24px/32px Nunito',
        letterSpacing: '0.48px',
        color: '#2B2322',
        opacity: 1,
    },

    formIcon: {
        textAlign: 'center',
    },

    fieldLabel: {
        textAlign: 'left',
        font: 'normal bold 16px/17px Nunito',
        letterSpacing: '0.32px',
        color: '#2B2322',
        opacity: 1,
    },

    textField: {
        textAlign: 'left',
        font: 'medium 16px/22px Nunito',
        letterSpacing: '0.32px',
        color: '#2B2322',
        margin: '20px 0px 20px 0px'
        
    },

    button: {
        width: '100%',
        height: '42px',
        background: '#2B2322 0% 0% no-repeat padding-box',
        boxShadow: '0px 2px 2px #00000029',
        border: '2px solid #2B2322',
        borderRadius: '4px',
        textAlign: 'center',
        font: 'normal normal bold 16px/25px Nunito',
        letterSpacing: '0.32px',
        color: '#FFFFFF',
        opacity: 1,

        '&:hover':{
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            color: '#2B2322',
        },

        '&:disabled':{
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            color: '#808080',
            border: '1px solid #808080',
            '&:hover':{
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                color: '#808080',
                border: '1px solid #808080',
            },
        },

        margin: '20px 0px 20px 0px'
        
    },

    registerText: {
        textAlign: 'center',
        letterSpacing:'0.3px',
        color: '#2B2322',
        opacity: 1,
        textDecoration: 'none'
    },

    progressCircle: {
        position: 'absolute'
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Login = props => {

    const classes = useStyles();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
        
      });

      const handleSubmit = (values, {setSubmitting}) => {
        
        setTimeout(() => {
            props.login(
                values.email, 
                values.password)
            
            setSubmitting(false);
            values.password=""
        }, 1000);

    }

    const [openState, setOpenState] = useState({
        open: false
    })

    const [pathState, setPathState] = useState({
        oldPath: null,
        newPath: null
    })

    
    const [individualState, setIndividualState] = useState(true)

    const handleEntity = () => {
        setIndividualState(!individualState)
    }

    const handleOpen = () => {
        let oldPath = window.location.href;
        console.log("The state", oldPath)
        const backTo = oldPath.split(window.location.origin);

        const {id, username} = props;

        const newPath = `/#/register`;
        if(backTo[1]===newPath){
            oldPath = `/#/`}
    
        setPathState({
            oldPath: oldPath,
            newPath: newPath
        })

        window.history.pushState(null, null, newPath);

        setOpenState({
            open: true
        })
    }

    const handleClose = () => {
        
        window.history.pushState(null, null, pathState.oldPath);

        setOpenState({
            open: false
        })
    }

    let serverMessage = props.error.msg.non_field_errors

    return(
        <>
            <button className={classes.registerButton} onClick={handleOpen}>Register</button>

            <Dialog
                open={openState.open}
                onClose={handleClose}
                fullWidth
                TransitionComponent={Transition}
                maxWidth="sm">
                <DialogTitle>
                
                   <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                    >
                    <CloseIcon />
                    </IconButton>
                </DialogTitle>
                    <DialogContent className={classes.formContainer}>
                            
                            <Typography className={classes.formTitle}>
                                Contact information
                            </Typography>
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: ""
                                }}

                                validationSchema={schema}
                                onSubmit={handleSubmit}
                                validateOnChange={true}
                            >
                                {({isValid, dirty, isSubmitting}) => {
                                    return (
                                        <Form>


                                            <Typography className="filter-label">Entity</Typography>

                                            <div style={{display: 'flex', justifyContent: 'space-between', width: '75%'}}>
                                                <FormControlLabel onChange={handleEntity} checked={!individualState} control={<Checkbox />} label="Company" />
                                                <FormControlLabel onChange={handleEntity} checked={individualState} control={<Checkbox />} label="Person" />
                                            </div>
                                            <label className={classes.fieldLabel}>Email</label>
                                            <Field className={classes.textField} variant="outlined" fullWidth name="email" component={TextField} type="text"/>

                                            <label className={classes.fieldLabel}>Parola</label>
                                            <Field className={classes.textField} variant="outlined" fullWidth  name="password" component={TextField} type="password"/>

                                            <button className={classes.button} type="submit" disabled={!isValid || !dirty || isSubmitting}>
                                                    Login {isSubmitting ? <CircularProgress className={classes.progressCircle} size={30}/> : ""}
                                            </button>
                                            
                                            {serverMessage ? <Typography align="center" color="error" display='block'>{serverMessage}</Typography>: ""}
                                            <div className={classes.registerText}>
                                                <Typography >Not registered? <Link to="/register">Register</Link></Typography>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                            
                </DialogContent>
            </Dialog>
        </>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.errors
})

export default connect(mapStateToProps, {login})(withRouter(Login));*/

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';
import * as yup from 'yup';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import makeStyles from '@material-ui/styles/makeStyles';

import {register} from '../../actions/auth';

const useStyles = makeStyles({
    registerButton: {
        width: '140px',
        height: '42px',
        background: '#2B2322 0% 0% no-repeat padding-box',
        boxShadow: '0px 2px 2px #00000029',
        border: '2px solid #2B2322',
        borderRadius: '4px',
        textAlign: 'center',
        font: 'normal normal bold 16px/25px Nunito',
        letterSpacing: '0.32px',
        color: '#FFFFFF',
        opacity: 1,

        marginLeft: '12px',

        '&:hover':{
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            color: '#2B2322',
        }
    },

    formContainer: {
        padding: '0px 121px 40px 121px',
    },

    formTitle: {
        width: '150px',
        height: '32px',
        textAlign: 'left',
        font: 'normal normal bold 24px/32px Nunito',
        letterSpacing: '0.48px',
        color: '#2B2322',
        opacity: 1,
        margin: '20px 0px 20px 0px'
    },

    formIcon: {
        textAlign: 'center',
    },

    fieldLabel: {
        textAlign: 'left',
        font: 'normal bold 16px/17px Nunito',
        letterSpacing: '0.32px',
        color: '#2B2322',
        opacity: 1,
    },

    textField: {
        textAlign: 'left',
        font: 'medium 16px/22px Nunito',
        letterSpacing: '0.32px',
        color: '#2B2322',
        margin: '20px 0px 20px 0px'
        
    },

    button: {
        width: '100%',
        height: '42px',
        background: '#2B2322 0% 0% no-repeat padding-box',
        boxShadow: '0px 2px 2px #00000029',
        border: '2px solid #2B2322',
        borderRadius: '4px',
        textAlign: 'center',
        font: 'normal normal bold 16px/25px Nunito',
        letterSpacing: '0.32px',
        color: '#FFFFFF',
        opacity: 1,

        '&:hover':{
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            color: '#2B2322',
        },

        '&:disabled':{
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            color: '#808080',
            border: '1px solid #808080',
            '&:hover':{
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                color: '#808080',
                border: '1px solid #808080',
            },
        },

        margin: '20px 0px 20px 0px'
        
    },

    registerText: {
        textAlign: 'center',
        letterSpacing:'0.3px',
        color: '#2B2322',
        opacity: 1,
        textDecoration: 'none'
    },

    progressCircle: {
        position: 'absolute'
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Register = props => {

    const classes = useStyles();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).required(),
        password2: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Confirm your password'),
        
      });

      const handleSubmit = (values, {setSubmitting}) => {
        
        
        props.register(
            values.email, 
            values.password)
        
        setSubmitting(false);
        values.password=""
        values.password2=""

        props.isRegistered && handleClose()
        

    }

    const [openState, setOpenState] = useState({
        open: false
    })

    const [pathState, setPathState] = useState({
        oldPath: null,
        newPath: null
    })


    const handleOpen = () => {
        let oldPath = window.location.href;
        console.log("The state", oldPath)
        const backTo = oldPath.split(window.location.origin);

        const {id, username} = props;

        const newPath = `/#/register`;
        if(backTo[1]===newPath){
            oldPath = `/#/`}
    
        setPathState({
            oldPath: oldPath,
            newPath: newPath
        })

        window.history.pushState(null, null, newPath);

        setOpenState({
            open: true
        })
    }

    const handleClose = () => {
        
        window.history.pushState(null, null, pathState.oldPath);

        setOpenState({
            open: false
        })
    }

    let serverMessage = props.error.msg

    return(
        <>
            <button className={classes.registerButton} onClick={handleOpen}>Register</button>

            <Dialog
                open={openState.open}
                onClose={handleClose}
                fullWidth
                TransitionComponent={Transition}
                maxWidth="sm">
                <DialogTitle>
                
                   <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                    >
                    <CloseIcon />
                    </IconButton>
                </DialogTitle>
                    <DialogContent className={classes.formContainer}>
                            <div className={classes.formIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="46.985" height="46.986" viewBox="0 0 46.985 46.986">
                                    <g id="logo_multidom" transform="translate(-420.461 -258.523)">
                                        <path id="Path_169" data-name="Path 169" d="M467.447,258.523H420.461l23.493,23.493Z" transform="translate(0 0)" fill="#bbbcbc"/>
                                        <path id="Path_170" data-name="Path 170" d="M496.312,258.523l-23.493,23.493,23.493,23.492V258.523" transform="translate(-28.865)" fill="#888b8d"/>
                                        <path id="Path_171" data-name="Path 171" d="M420.463,258.523v46.986l23.492-23.492-23.492-23.493" transform="translate(-0.001)" fill="#8c8279"/>
                                        <path id="Path_172" data-name="Path 172" d="M443.954,310.882h0l-23.492,23.492h46.985l-23.493-23.492" transform="translate(-0.001 -28.866)" fill="#2b2322"/>
                                    </g>
                                </svg>
                            </div>
                            
                            <Typography className={classes.formTitle}>
                                Inregistrare
                            </Typography>
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                    password2: ""
                                }}

                                validationSchema={schema}
                                onSubmit={handleSubmit}
                                validateOnChange={true}
                            >
                                {({isValid, dirty, isSubmitting}) => {
                                    return (
                                        <Form>
                                            <label className={classes.fieldLabel}>Introdu adresa de email</label>
                                            <Field className={classes.textField} variant="outlined" fullWidth name="email" component={TextField} type="text"/>

                                            <label className={classes.fieldLabel}>Parola</label>
                                            <Field className={classes.textField} variant="outlined" fullWidth  name="password" component={TextField} type="password"/>

                                            <label className={classes.fieldLabel}>Confirm Password</label>
                                            <Field className={classes.textField} variant="outlined" fullWidth  name="password2" component={TextField} type="password"/>

                                            <button className={classes.button} type="submit" disabled={!isValid || !dirty || isSubmitting}>
                                                    Register {isSubmitting ? <CircularProgress className={classes.progressCircle} size={30}/> : ""}
                                            </button>
                                            
                                            {serverMessage ? <Typography align="center" color="error" display='block'>{serverMessage && serverMessage.email}</Typography>: ""}
                                            
                                        </Form>
                                    )
                                }}
                            </Formik>
                            
                </DialogContent>
            </Dialog>
        </>
    )
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    isRegistered: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isRegistered: state.auth.isRegistered,
    error: state.errors
})

export default connect(mapStateToProps, {register})(withRouter(Register));