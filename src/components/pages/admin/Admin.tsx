import React, { useState } from 'react';
import Notification from '../../notifications/Notification';
import { upload } from '../../../services/items';
import { NewItem } from '../../../../types';

const Admin = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState<string>('');
    const [avgRating, setAvgRating] = useState<number>(0);
    const [isOnSale, setIsOnsale] = useState<boolean>(false);
    const [stockCount, setStockCount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<File>();
    const [notification, setNotification] = useState<{message: string, class: string}>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element:any = document.getElementById('isOnSale');
    let isChecked;
    if (element) {
        isChecked = element.checked;
    }

    if (isChecked) {
        setIsOnsale(true);
    }
    
    const onFormSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const item: NewItem = {
            name: name,
            description: description,
            avgRating: avgRating,
            isOnSale: isOnSale,
            stockCount: stockCount,
            price: price,
            image: image
        };

        // creating the form
        const formData = new FormData();

        for (const property in item) {
            formData.append(property, name);
        }

        await upload(formData);
        setNotification({message: "Item saved successfully", class: "alert alert-success"});
        setTimeout(() => {
            setNotification(undefined);
        }, 5000);
    };

    return (
        <div className='container'>
            {notification ? <div className="row">
                                <div className={`col-sm-6 offset-sm-3 ${notification.class}`} role="alert">
                                    <Notification message={notification.message} />
                                </div>
                            </div> 
                           : null
            }
            <h2 className="my-5 text-center">Here is the admin to manage products</h2>
            <div><h4>Create New Product</h4></div>
            <form className="p-5 border border-primary" id="form">
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Product Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="name" placeholder="Name the item here" onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="description" placeholder="Describe the item"  onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="rating" className="col-sm-2 col-form-label">Rating</label>
                    <div className="col-sm-6">
                        <input type="number" id="rating" name="rating" min="1" max="5"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvgRating(Number(e.target.value))} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="isOnSale" className="col-sm-2 col-form-label">On Sale</label>
                    <div className="col-sm-6">
                        <input  type="checkbox" id="isOnSale" name="onSale" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="stockCount" className="col-sm-2 col-form-label">Stock count</label>
                    <div className="col-sm-6">
                        <input type="number" id="stockCount" name="stockCount" min='1' max='2000'  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStockCount(Number(e.target.value))} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
                    <div className="col-sm-6">
                        <input type="number" id="price" name="stockCount"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="image" className="col-sm-2 col-form-label">Price</label>
                    <div className="col-sm-6">
                        <input type="file" id="image" name="item" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files![0])} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                        <button type="submit" className="btn btn-primary" onClick={() => onFormSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Admin;