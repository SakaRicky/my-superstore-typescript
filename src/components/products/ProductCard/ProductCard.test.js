import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard'
import { BrowserRouter } from 'react-router-dom'

test('should render content', () => {
    const product = {
        name: 'Test product',
        imgUrl: 'test@image.com',
        description: 'This product is used for testing',
        price: 200,
        average_rating: 3.5,
        isOnsale: true,
        id: "123dge53489ds4"
    }

    const component = render(
        <BrowserRouter>
            <ProductCard
                name={product.name}
                imgUrl={product.imgUrl} 
                description={product.description} 
                price={product.price}
                average_rating={product.avgRating}
                isOnSale={product.isOnSale}
                item_id={product.id}
            />
        </BrowserRouter>  
    )

    // component.debug()

    expect(component.container).toHaveTextContent('Test product')

    const div = component.container.querySelector('.card')
    expect(div).toHaveTextContent('Test product')
})

// test('should call event handler once when button is clicked', () => {
//     const product = {
//         name: 'Test product',
//         imgUrl: 'test@image.com',
//         description: 'This product is used for testing',
//         price: 200,
//         average_rating: 3.5,
//         isOnsale: true,
//         id: "123dge53489ds4"
//     }

//     const mockHandler = jest.fn()

//     const component = render(
//         <BrowserRouter>
//             <ProductCard
//                 name={product.name}
//                 imgUrl={product.imgUrl} 
//                 description={product.description} 
//                 price={product.price}
//                 average_rating={product.avgRating}
//                 isOnSale={product.isOnSale}
//                 item_id={product.id}
//             />
//         </BrowserRouter>  
//     )

//     const link = component.getByText('View Item')
//     fireEvent.click(link)

//     expect(mockHandler.mock.calls).toHaveLength(1)
// })
