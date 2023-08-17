import { connect } from 'react-redux';
import { actions } from '../../redux/dialogs_reducer'
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateRedicerType } from '../../redux/redux_store';


let mapStateToProps = (state: AppStateRedicerType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
    
}

export default compose(connect(mapStateToProps, { ...actions }), withAuthRedirect)(Dialogs);