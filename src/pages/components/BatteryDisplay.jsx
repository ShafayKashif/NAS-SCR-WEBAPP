import React from 'react';

// Assuming the images are located in the correct path: ../assets/img/
const batteryImages = {
  battery20: require('../assets/img/Battery20Icon.png'),
  battery30: require('../assets/img/Battery30Icon.png'),
  battery50: require('../assets/img/Battery50Icon.png'),
  battery60: require('../assets/img/Battery60Icon.png'),
  battery80: require('../assets/img/Battery80Icon.png'),
  battery90: require('../assets/img/Battery90Icon.png'),
  batteryFull: require('../assets/img/BatteryFullIcon.png'),
  batteryZero: require('../assets/img/BatteryZeroIcon.png'),
  noBattery: require('../assets/img/NoBatteryIcon.png'),
};

const BatteryDisplay = ({ charge }) => {
  // Determine the appropriate image based on the charge prop
  let selectedImage;
  if (charge === 0) {
    selectedImage = batteryImages.batteryZero;
  }
  else if (charge <= 20) {
    selectedImage = batteryImages.battery20;
  } else if (charge <= 30) {
    selectedImage = batteryImages.battery30;
  } else if (charge<=50){
    selectedImage = batteryImages.battery50;
  } else if (charge <= 60) {
    selectedImage = batteryImages.battery60;
  }
  else if (charge <= 80) {
    selectedImage = batteryImages.battery80;
  }
  else if (charge < 100) {
    selectedImage = batteryImages.battery90;
  }
  
  else if (charge === 100) {
    selectedImage = batteryImages.batteryFull;
  }
  else {
    // If the charge is greater than 60, use the default image (battery60)
    selectedImage = batteryImages.noBattery;
  }

  return (
    <div style={styles.container}>
      <img
        src={selectedImage}
        alt="Battery Icon"
        style={styles.image}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80, // Adjust the width and height as per your image requirements
    height: 40,
  },
};

export default BatteryDisplay;
