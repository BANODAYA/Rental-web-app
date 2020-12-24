import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Header from '../../../Application/Header/Header'

//this function calls the calculations from the backend and presents the information in front end
class RentalCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			err: null,
			isLoading: false,
			details: {},
			selected: 0,
		};
	}

	async componentDidMount() {
		var addressData = { addressline: '36 Sylvester Rd', city: 'Natick', state: 'MA' }
		this.setState({ loading: true })
		console.log(JSON.stringify(addressData))

		fetch("http://localhost:5000/api/rentals/rentalCalculator", {
			method: 'POST',
			headers: { 'Content-type': 'application/json', 'Authorization': localStorage.getItem("jwtToken") },
			body: JSON.stringify(addressData)
		})
			.then(response => response.json())
			.then(details => {
				this.setState({
					loading: false,
					details
				})
			},
				err => {
					this.setState({
						err,
						isLoading: false
					})
				})
		await new Promise(r => setTimeout(r, 2000));
	}

	render() {
		let { details, err, isLoading , selected} = this.state;
		console.log(details);
		if (err) {
			return (<div> {err.message} </div>)
		}

		if (isLoading) {
			return (<div> Loading.... </div>)
		}
		const data = JSON.stringify(details, null, '\t\n');
		return (

			<div className="page-app">
				<Header />
				<div className="header-box">
					<div className="heading">Property Analysis</div>
					<div className="heading-tags">Rentals / Example: Rental Property / Property Analysis</div>
				</div>
				<div className="boxesF">
					<div className="box-1">Cash Needed: ${Math.floor(details.TotalCashRequired)} </div>
					<div className="box-2">Cash Flow: ${Math.floor(details.CashFlowPerUnitPerMonth)}</div>
				</div>
				<div className="boxesS">
					<div className="box-3">Cap Rate: {Math.floor(details.CapRateOnPP)}%</div>
					<div className="box-4">COC: {Math.floor(details.CashOnCashROI)}%</div>
				</div>
				<div className="info-purchase">Property Information</div>
				<div className="info-box">
					<div className="info-box-keys">
						<div>User Email:</div>
						<div>Address:</div>
						<div>Zipcode:</div>
						<div>Fair Market Value:</div>
						<div>Vacancy Rate:</div>
						<div>Managemant Rate:</div>
						<div>Advertizing Cost per Vacancy:</div>
						<div>Number of units:</div>
						<div>Annual Appreciation Rate:</div>
						

						
					</div>
					<div className="info-box-values">
						<div> {details.UserEmail}</div>
						<div>{details.Address}</div>
						<div>$ {details.FairMarketValue}</div>

						<div>${details.VacancyRate}%</div>
						<div> $ {details.ManagementRate}</div>
						<div>${details.
							AdvertizingCostPerVacancy}</div>
						<div>{details.NumberOfUnits}</div>
						<div>{details.AnnualAppreciationRate}%</div>
						
					</div>
				</div>
				<div className="header-purchase">Purchase Information</div>
				<div className="purchase-box">
					<div className="purchase-box-keys">
						<div>Offer Price:</div>
						<div>Repairs:</div>
						<div>Repairs Contingency:</div>
						<div>Lender Fee:</div>
						<div>Broker Fee:</div>
						<div>Enviromentals:</div>
						<div>Inspections/Engineer Report:</div>
						<div>Appraisals:</div>
						<div>Misc:</div>
						<div>Transfer Tax:</div>
						<div className="line">Legal:</div>

						<div>Real Purchase Price:</div>
					</div>
					<div className="purchase-box-values">
						<div>$ {details.OfferPrice}</div>
						<div>$ {details.Repairs}</div>
						<div>$ {details.RepairsContingency}</div>

						<div>${details.LenderFee}</div>
						<div> $ {details.BrokerFee}</div>
						<div>${details.Environmentals}</div>
						<div>${details.InspectionsEngineerReport}</div>
						<div>${details.Appraisals}</div>
						<div>${details.Misc}</div>
						<div>${details.TransferTax}</div>
						<div className="line">${details.Legal}</div>
						<div>= $ {details.RealPurchasePrice}</div>
					</div>
				</div>
				<div className="pie-chart">
					<PieChart style={{ height: 250 }}
						label={({ dataEntry }) =>
							`${Math.round(dataEntry.percentage)} %`
						}
						animate
						onClick={(_, index) => {
							this.setState({ selected: index === selected ? undefined : index });
						}}
						onMouseOver={(_, index) => {
							this.setState({ hovered: index });
						}}
						onMouseOut={() => {
							this.setState({ hovered: false });
						}}
						segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
						segmentsShift={(index) => (index === selected ? 6 : 1)}
						data={[
							{ title: 'One', value: 10, color: '#E38627' },
							{ title: 'Two', value: 15, color: '#C13C37' },
							{ title: 'Three', value: 20, color: '#6A2135' },
						]}
					/>
				</div>

				<div className="valuation-header">Financing(Monthly)</div>
				<div className="valuation-data">
					<div className="valuation-box">
						<div className="valuation-box-keys">
							<div>Principle Amount:</div>
							<div>Interest Rate:</div>
							<div>Amortization Period:</div>
							<div>CHMC Fee:</div>
							<div>Total Monthly Payment:</div>
							<div>Other Financing Costs:</div>
							<div>Cash Required to Close :</div>
							<div>Down Payment Percent:</div>
						</div>
						<div className="valuation-box-values">
							<div>$ {details.PrincipleAmount}</div>
							<div> {details.InterestRate}%</div>
							<div>{details.AmortizationPeriod} years</div>
							<div> {details.CHMCFee}%</div>
							<div>$ {Math.floor(details.MortgageMonthlyPayment)}</div>
							<div>$ {details.OtherMonthlyFinanceCost}</div>
							<div>$ {details.CashRequiredToCloseAfterFinancing}</div>
							<div> {details.DownPayment}%</div>


						</div>
					</div>
				</div>
				<div className="cashflow-header">Income(Annual)</div>
				<div className="cashflow-data">
					<div className="cashflow-box">
						<div className="cashflow-box-keys">
							<div>Gross Rents:</div>
							<div>Parking:</div>
							<div>Storage:</div>
							<div>Laundry/Vending:</div>
							<div>Other:</div>
							<div>Total Income:</div>
							<div>Vacancy Loss:</div>
							<div>Effective Gross Income:</div>
						</div>
						<div className="cashflow-box-values">
							<div >$ {details.GrossRents}</div>
							<div >${details.Parking}</div>
							<div >$ {details.Storage}</div>
							<div >${details.LaundryVending}</div>
							<div >${details.OtherIncome}</div>
							<div >$ {details.TotalIncome}</div>
							<div >$ {details.VacancyLoss}</div>
							<div >$ {details.EffectiveGrossIncome}</div>
						</div>
					</div>
				</div>
				<div className="pie-chart">
					<PieChart style={{ height: 250 }}
						label={({ dataEntry }) =>
							`${Math.round(dataEntry.percentage)} %`
						}
						animate
						onClick={(_, index) => {
							this.setState({ selected: index === selected ? undefined : index });
						}}
						onMouseOver={(_, index) => {
							this.setState({ hovered: index });
						}}
						onMouseOut={() => {
							this.setState({ hovered: false });
						}}
						segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
						segmentsShift={(index) => (index === selected ? 6 : 1)}
						data={[
							{ title: 'One', value: 50, color: '#E38627' },
							{ title: 'Two', value: 25, color: '#C13C37' },
							{ title: 'Three', value: 25, color: '#6A2135' },
						]}
					/>
				</div>
				<div className="investment-header">Operating Expenses(Annual)</div>
				<div className="investment-data">
					<div className="investment-box">
						<div className="investment-box-keys">
							<div>Property Taxes:</div>
							<div>Insurance:</div>
							<div>Repairs:</div>
							<div>Electricity:</div>
							<div>Gas:</div>
							<div>Lawn/snow Maintenance:</div>
							<div>Water/Sewer:</div>
							<div>Cable:</div>
							<div>Management:</div>
							<div>Caretaking:</div>
							<div>Advertizing:</div>
							<div>Association Fees:</div>
							<div>Pest Control:</div>
							<div>Security:</div>
							<div>Trash Removal:</div>
							<div>Miscellaneous:</div>
							<div>Common Area Maintenance:</div>
							<div>Captial Improvements:</div>
							<div>Accounting:</div>
							<div>Legal:</div>
							<div>Bad Debts:</div>
							<div>Other:</div>
							<div>Evictions:</div>
							<div>Total Expenses:</div>

						</div>
						<div className="investment-box-values">
							<div>$ {details.PropertyTax}</div>
							<div> ${details.Insurance}</div>
							<div> $ {details.RepairsExpense}</div>
							<div> ${details.Electricity}</div>
							<div> ${details.Gas}</div>
							<div> $ {details.LawnSnowMaintenance}</div>
							<div> $ {details.WaterSewer}</div>
							<div> $ {details.Cable}</div>
							<div> $ {details.Management}</div>
							<div> $ {details.Caretaking}</div>
							<div> $ {details.Advertizing}</div>
							<div> $ {details.AssociationFee}</div>
							<div> $ {details.PestControl}</div>
							<div> $ {details.Security}</div>
							<div> $ {details.TrashRemoval}</div>
							<div> $ {details.MiscellaneousExpense}</div>
							<div> $ {details.CommonAreaMaintenance}</div>
							<div> $ {details.CapitalImprovements}</div>
							<div> $ {details.Accounting}</div>
							<div> $ {details.LegalExpense}</div>
							<div> $ {details.BadDebts}</div>
							<div> $ {details.OtherExpense}</div>
							<div> $ {details.Evictions}</div>
							<div> $ {details.TotalOperatingExpenses}</div>
						</div>
					</div>
				</div>
				<div className="financial-header">Net Operating Income(Annual)</div>
				<div className="financial-data">
					<div className="financial-box">
						<div className="financial-box-keys">
							<div>Net Operating Income:</div>

						</div>
						<div className="financial-box-values">
							<div>$ {details.NetOperatingIncome}</div>

						</div>
					</div>
				</div>
				<div className="Req-header">Cash Requirements</div>
				<div className="Req-data">
					<div className="Req-box">
						<div className="Req-box-keys">
							<div>Deposit(s) with offer:</div>
							<div>Less Pro-Ration Rents:</div>
							<div>Cash Required to Close:</div>
							<div>Total Cash Required:</div>

						</div>
						<div className="Req-box-values">
							<div>$ {details.DepositsMadeWithOffer}</div>
							<div> ${details.LessProRationOfRents}</div>
							<div> $ {details.CashRequiredToClose}</div>
							<div> ${details.TotalCashRequired}</div>

						</div>
					</div>
				</div>
				<div className="sum-header">CashFlow Summary(Annual)</div>
				<div className="sum-data">
					<div className="sum-box">
						<div className="sum-box-keys">
							<div>Net Operating Income:</div>
							<div>Debt Servicing Costs:</div>
							<div>Annual Profit or Loss:</div>
							<div>Total Monthly ProfitOrLoss:</div>
							<div>CashFlow/unit/month:</div>

						</div>
						<div className="sum-box-values">
							<div>$ {details.NetOperatingIncome}</div>
							<div>$ {Math.floor(details.DebtServicingCosts)}</div>
							<div>= ${Math.floor(details.AnnualProfitOrLoss)}</div>
							<div> $ {Math.floor(details.TotalMonthlyProfitOrLoss)}</div>
							<div> ${Math.floor(details.CashFlowPerUnitPerMonth)}</div>

						</div>
					</div>
				</div>
				<div className="qa-header">Quick Analysis</div>
				<div className="qa-data">
					<div className="qa-box">
						<div className="qa-box-keys">
							<div>Mortgage LTV:</div>
							<div>Mortgage LTPP:</div>
							<div>Cap Rate On PP:</div>
							<div>Cap Rate on FMV:</div>
							<div>Average Rent:</div>
							<div>GRM:</div>
							<div>DCR:</div>
							<div>Cash on Cash ROI:</div>
							<div>Equity ROI:</div>
							<div>Appreciation ROI:</div>
							<div>Total ROI:</div>
							<div>Forced App ROI:</div>
							<div>Expense to Income Ratio:</div>
						</div>
						<div className="qa-box-values">
							<div> {Math.floor(details.MortgageLTV)}%</div>
							<div>{Math.floor(details.MortgageLTPP)}%</div>
							<div> {Math.floor(details.CapRateOnPP)}%</div>
							<div>{Math.floor(details.CapRateOnFMV)}%</div>
							<div>${Math.floor(details.AverageRent)}</div>
							<div> {Math.floor(details.GRM)}</div>
							<div> {Math.floor(details.DCR)}</div>
							<div> {Math.floor(details.CashOnCashROI)}%</div>
							<div> {Math.floor(details.EquityROIAfterOneYear)}%</div>
							<div> {Math.floor(details.AppreciationROIAfterOneYear)}%</div>
							<div> {Math.floor(details.TotalROIAfterOneYear)}%</div>
							<div> {Math.floor(details.ForcedAppROIAfterOneYear)}%</div>
							<div>{Math.floor(details.ExpenseToIncomeRatio)}%</div>

						</div>
					</div>
				</div>
			</div>
		)
  

      
	}
}


export default RentalCalculator;