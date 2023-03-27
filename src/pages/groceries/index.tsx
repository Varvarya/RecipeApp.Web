import React, {useEffect, useState} from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import Button from '../../components/button';
import uploadFile from '../../utils/fileReader';
import { analizePhotoAction } from '../../state/groceriesSlice/actions';

type GroceriesPageProps ={
	sendPhoto: any,
}

const GroceriesPage: React.FC<GroceriesPageProps> = ({sendPhoto}) => {
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile, preview]);

	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}

		setSelectedFile(e.target.files[0]);
	};

	return (
		<div className='background'>
			<NavBar />
			<Window title={'Add ingredient'}>
				<form onClick={onSelectFile} className='fileUploader' >
					<label htmlFor="img">Select image:</label>
					<input type="file" id="img" name="img" accept="image/*" />
					{selectedFile &&  <img className='preview' src={preview} /> }
				</form>
				<Button onClick={() => sendPhoto(uploadFile(selectedFile))} text={'Upload'}/>
			</Window>
		</div>
	);
};

const mapStateToProps = null;
const mapDispatchToProps = {
	sendPhoto: analizePhotoAction
};

export default connect(mapStateToProps,mapDispatchToProps)(GroceriesPage);
