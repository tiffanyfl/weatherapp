import { StyleSheet } from 'react-native';

const general = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#13315C",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "#13315C",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  backg: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "#CDEDF6", 
  }
});

const criteres = StyleSheet.create({
  criteriaContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  redirectLink: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  }
});
const alertcss = StyleSheet.create({
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 10,
  },
  infoIcon: {
    fontSize: 18,
    color: 'white',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 18,
    marginRight: 10,
  },
  alertValue: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  infoContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  hideInfoText: {
    color: '#007bff',
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20, 
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export { general, criteres, alertcss };
