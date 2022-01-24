import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { sliderItems } from '../data';
function Slider() {
	const Container = styled.div`
		width: 100%;
		height: 80vh;
		display: flex;
		position: relative;
		overflow: hidden;
	`;

	const Arrow = styled.div`
		width: 50px;
		height: 50px;
		background-color: #fff7f7;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: ${(props) => props.direction === 'left' && '10px'};
		right: ${(props) => props.direction === 'right' && '10px'};
		margin: auto;
		cursor: pointer;
		opacity: 0.5;
		z-index: 2;
	`;

	const Wrapper = styled.div`
		height: 100%;
		display: flex;
		transition: all 1.5s ease;
		transform: translateX(${(props) => props.slideIndex * -100}vw);
	`;

	const Slide = styled.div`
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		background-image: url(${(props) => props.img});
		background-repeat: no-repeat;
		background-size: 100% 100%;
	`;

	const InfoContainer = styled.div`
		flex: 1;
		padding: 50px;
		color: white;
		margin-left: 30px;
		font-family: 'Moon Dance', cursive;
	`;

	const Title = styled.h2`
		font-size: 70px;
	`;

	const Desc = styled.p`
		margin: 50px 0px;
		font-size: 20px;
		font-weight: 500;
		letter-spacing: 3px;
	`;

	const Button = styled.button`
		padding: 10px;
		font-size: 20px;
		font-weight: 900;
		background-color: #00695c;
		cursor: pointer;
		border-outline: none;
		color: white;
	`;
	const navigate = useNavigate();
	const [slideIndex, setSlideIndex] = useState(0);
	const handleClick = (direction) => {
		if (direction === 'left') {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}
	};

	return (
		<Container>
			<Arrow direction='left' onClick={() => handleClick('left')}>
				<ArrowLeftOutlined />
			</Arrow>
			<Wrapper slideIndex={slideIndex}>
				{sliderItems.map((item) => (
					<Slide bg={item.bg} key={item.id} img={item.img}>
						<InfoContainer>
							<Title>{item.title}</Title>
							<Desc>{item.desc}</Desc>
							<Button onClick={() => navigate(`/menu/${item.category}`)}>
								ORDER NOW
							</Button>
						</InfoContainer>
					</Slide>
				))}
			</Wrapper>
			<Arrow direction='right' onClick={() => handleClick('right')}>
				<ArrowRightOutlined />
			</Arrow>
		</Container>
	);
}

export default Slider;
