import React, {useEffect, useState} from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import Button from '../../components/button';
import uploadFile from '../../utils/fileReader';
import { analyzePhotoAction } from '../../state/groceriesSlice/actions';

type GroceriesPageProps ={
	sendPhoto: any,
	groceries: {confidence: number, class: string} [],
}

const GroceriesPage: React.FC<GroceriesPageProps> = ({sendPhoto, groceries=[]}) => {
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState<string | undefined>(undefined);
	const [groceriesList, setGroceriesList] = useState(groceries);

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile, groceries]);

	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}

		setSelectedFile(e.target.files[0]);
	};

	const analyzePhoto = () => {
		if (selectedFile) sendPhoto(selectedFile).then((res: any) => {
			console.log(res);
			setGroceriesList(res.payload.ingredients);
		});
	};

	return (
		<div className='background'>
			<NavBar />
			<Window title={'Add ingredient'}>
				<div className='row'>
					<form onClick={onSelectFile} className='fileUploader' >
						<label htmlFor="img">Select image:</label>
						<input type="file" id="img" name="img" accept="image/*" />
						{selectedFile && <img className='preview' src={preview} />}
					</form>
					<div className='fileUploader'>
						<ul>
							{groceriesList.map((e, index) => (<li key={index} className={'item'}>{e.class}</li>))}
						</ul>
					</div>
				</div>
				<Button onClick={analyzePhoto} text={'Upload'}/>
			</Window>
		</div>
	);
};

const mapStateToProps = ({groceries}:any) => ({
	groceries: groceries.groceries
});
const mapDispatchToProps = {
	sendPhoto: analyzePhotoAction
};

export default connect(mapStateToProps,mapDispatchToProps)(GroceriesPage);
